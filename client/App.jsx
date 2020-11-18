import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import PhotoCarousel from './components/PhotoCarousel.jsx';
import PhotosModal from './components/modal/index.jsx';

Modal.setAppElement(document.getElementById('app'));

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
      modal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal (e, state) {
    e.preventDefault();

    this.setState({
      modal: state
    });
  }

  componentDidMount() {
    console.log('mounting component');

    axios.get('/api/homes/photos')
      .then(res => {
        this.setState({
          data: res
        });
      })
      .catch (err => {
        console.log('ERROR');
      });
  }

  render () {
    return (
      <div>
        <h1>PHOTO CAROUSEL</h1>
        <Modal isOpen={this.state.modal} >
          <PhotosModal toggleModal={this.toggleModal}>
            Modal is open
          </PhotosModal>
        </Modal>
        <PhotoCarousel toggleModal={this.toggleModal} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
