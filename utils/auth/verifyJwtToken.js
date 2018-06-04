/**
The MIT License (MIT)
Copyright (c) 2017 Fredrik Westmark
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**/

/**
Based on https://auth0.com/blog/navigating-rs256-and-jwks/

MODIFIED verifyJWTToken to work with Strategic Machines
**/

const request = require( 'request' );
const jwt = require( 'jsonwebtoken' );
const config = require('../../config').init();


function certToPEM( cert ) {
  let pem = cert.match( /.{1,64}/g ).join( '\n' );
  pem = `-----BEGIN CERTIFICATE-----\n${ cert }\n-----END CERTIFICATE-----\n`;
  return pem;
}

let jwks = null;

function fetchJWKS( tenant ) {
  if ( jwks ) {
    return Promise.resolve();
  }
  return new Promise( ( resolve, reject ) => {
    request(
      {
        uri: config.auth0.jwksUri,
        strictSsl: true,
        json: true,
      },
      ( err, res ) => {
        if ( err ) {
          reject( err );
        } else if ( res.statusCode < 200 || res.statusCode >= 300 ) {
          reject( new Error( res.body && ( res.body.message || res.body ) ) );
        } else {
          jwks = res.body.keys;
          resolve();
        }
      }
    );
  } );
}

function getJWKS() {
  return jwks;
}

function getJWKSSigningKeys() {
  return jwks
    .filter(
      ( key ) =>
        key.use === 'sig' && // JWK property `use` determines the JWK is for signing
        key.kty === 'RSA' && // We are only supporting RSA (RS256)
        key.kid && // The `kid` must be present to be useful for later
        ( ( key.x5c && key.x5c.length ) || ( key.n && key.e ) ) // Has useful public keys
    )
    .map( ( key ) => ( { kid: key.kid, nbf: key.nbf, publicKey: certToPEM( key.x5c[ 0 ] ) } ) );
}

function getJWKSSigningKey( kid ) {
  return getJWKSSigningKeys().find( ( key ) => key.kid === kid );
}

function extractAuthenicationToken( req ) {
  
  const authHeader = req.req.headers;

  if (!authHeader.authorization || authHeader === undefined || authHeader === 'undefined') {
    return { header: null }; //new Error( 'credentials_required', { message: 'No authorization token was found' } );
  }

  return authHeader.authorization;
}

async function verifyJWTToken( req, res, next ) {
  
  await fetchJWKS( req );
  const token = extractAuthenicationToken( res );
  if(token === undefined || !token || token == 'undefined') {
    return res.status(401).end()

  }
  const decodedToken = jwt.decode( token, { complete: true } );
  const { header } = decodedToken;

  if ( !header || header.alg !== 'RS256' ) {
    return res.status(401).end();
  }

  const key = getJWKSSigningKey( header.kid );
  const actualKey = key.publicKey || key.rsaPublicKey;
  console.log("KEY:::::::", key);
  console.log("ACTUALKEY::::::::", actualKey);

  jwt.verify( token, actualKey, { algorithms: [ 'RS256' ] }, ( err, decoded ) => {
    console.log(":::::DECODED!!!", decoded);
    if ( err ) {
      //next(err, null);
      res.status(401).end();
    } else {
      next(null, decoded);
    }
  });
}

function getIdFromToken(token) {
  let decodedToken = jwt.decode(token, {complete: true});
  return decodedToken.payload.sub.replace('auth0|', '');
}

module.exports = {
  verifyJWTToken,
  getIdFromToken,
};