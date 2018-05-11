import React, {Component} from 'react';
import DropZone from 'dropzone';


const config = require('../../../../../config').init();

const dropZoneStyle ={
    backgroundColor: "#eee",
    border: "1px solid black",
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px"
}

class ImageUpload extends Component {
    state = {
        saveUser: this.props.saveUser,
    }

    onImageDrop = files => {
        const client = this.props.client;
        let formData  = new FormData();
        formData.append("image", files[0]);
        axios.post(config.cloudinary.url, formData, { headers: { "Content-Type": "Multipart/form-data" }})
        .then(response => {
            client.image = resp.body.secure_url;
            this.setState({ client: this.})
        })
            /*UPLOAD_URL)
            .field("upload_preset", UPLOAD_PRESET)
            .field("file", files[0]);*/
        /*})
        upload.end((err, resp) => {
            if(err) return console.log(err);

            if(resp.body.secure_url !== '') {
                user.foodTrucks[0].imageUrl = resp.body.secure_url;
                this.setState({ user: user, message: "Image uploaded!" });
                this.onUserFormSubmit();
            }
        })*/
    }

    render() {
        <h5>Image</h5>
        { props.foodTruck.image ? <img src={ this.state.user.image } className="img-thumbnail"  alt={` ${this.state.user.name }'s logo`} /> : "" }    
        <Dropzone
            style={dropZoneStyle}
            multiple={false} accept="image/*"
            onDrop={ props.onImageDrop }>
            <p>Drop an image of your logo here or click to select one from your computer</p>
        </Dropzone>

    }
}