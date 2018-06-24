<<<<<<< HEAD
import React, { Component }   from 'react';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioData: {},
      profile: {}
    }
  }
  render() {
    return (
    <section>

      <h1 className="my-4"> Products
      </h1>

      <div className="row">

        <div className="col-md-8">
          <img className="img-fluid" src="http://placehold.it/750x500" alt="" />
        </div>

        <div className="col-md-4">
          <h3 className="my-3">Project Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
          <h3 className="my-3">Project Details</h3>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Dolor Sit Amet</li>
            <li>Consectetur</li>
            <li>Adipiscing Elit</li>
          </ul>
        </div>

      </div>

      <h3 className="my-4">Related Products</h3>

      <div className="row">

        <div className="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
          </a>
        </div>

        <div className="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
          </a>
        </div>

        <div className="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
          </a>
        </div>

        <div className="col-md-3 col-sm-6 mb-4">
          <a href="#">
            <img className="img-fluid" src="http://placehold.it/500x300" alt="" />
          </a>
        </div>

      </div>
    </section>
    );
  }
}

export default Products;
=======
import React from "react";

const Products = () =>
  <div>
    <h1>Products Page</h1>
    <p>
      Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer
      gravida dui mauris, ut interdum nunc egestas sed. Aenean sed mollis diam.
      Nunc aliquet risus ac finibus porta. Nam quis arcu non lectus tincidunt
      fermentum. Suspendisse aliquet orci porta quam semper imperdiet. Praesent
      euismod mi justo, faucibus scelerisque risus cursus in. Sed rhoncus mollis
      diam, sit amet facilisis lectus blandit at.
    </p>
  </div>;

export default Products;
>>>>>>> upstream/master
