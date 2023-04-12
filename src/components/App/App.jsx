import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../../services/images-api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setIsLoading(prevIsLoading => !prevIsLoading);

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id: id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );
          setTotalImages(totalHits);
          return imagesArray;
        })
        .then(imagesArray => {
          if (page === 1) {
            setImages(imagesArray);
          }
          return imagesArray;
        })

        .then(imagesArray => {
          if (page !== 1) {
            setImages(prevImages => [...prevImages, ...imagesArray]);
          }
        })

        .catch(error => setError(toast.error(error)))
        .finally(() => setIsLoading(false));
    }
  }, [query, page, error]);

  const getSearchRequest = query => {
    setQuery(query, images, page);
  };

  const onNextFetch = () => {
    setPage(page => page + 1);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const openModal = ({ description, largeImage }) => {
    setShowModal(true);
    setCurrentImageUrl(largeImage);
    setCurrentImageDescription(description);
  };

  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />

      {images && <ImageGallery images={images} openModal={openModal} />}

      {isLoading && <Loader />}

      {!isLoading && totalImages !== images.length && (
        <Button onNextFetch={onNextFetch} />
      )}

      {showModal && (
        <Modal
          onClose={closeModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     totalImages: 0,
//     isLoading: false,
//     showModal: false,
//     images: [],
//     error: null,
//     currentImageUrl: null,
//     currentImageDescription: null,
//   };

// componentDidUpdate(prevProps, prevState) {
//   const { query, page, error } = this.state;

//   if (prevState.query !== query || prevState.page !== page) {
//     this.setState({ isLoading: true, error: null });

//     if (prevState.error !== error && error) {
//       toast.error(error);
//     }
//     fetchImages(query, page)
//       .then(({ hits, totalHits }) => {
//         const imagesArray = hits.map(
//           ({ id, tags, webformatURL, largeImageURL }) => ({
//             id: id,
//             description: tags,
//             smallImage: webformatURL,
//             largeImage: largeImageURL,
//           })
//         );

//         if (!imagesArray.length) {
//           toast('Images not found');
//           return;
//         }

//         return this.setState(prevState => ({
//           images: [...prevState.images, ...imagesArray],
//           totalImages: totalHits,
//         }));
//       })
//       .catch(error => this.setState({ error: error.message }))
//       .finally(() => this.setState({ isLoading: false }));
//   }
// }

//   getSearchRequest = query => {
//     this.setState({ query, images: [], page: 1 });
//   };

//   onNextFetch = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   closeModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       currentImageUrl: null,
//       currentImageDescription: null,
//     }));
//   };

//   openModal = ({ description, largeImage }) => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       currentImageUrl: largeImage,
//       currentImageDescription: description,
//     }));
//   };

//   render() {
//     const {
//       images,
//       totalImages,
//       isLoading,
//       showModal,
//       currentImageUrl,
//       currentImageDescription,
//     } = this.state;

//     const { getSearchRequest, onNextFetch, openModal, closeModal } = this;

//     return (
//       <>
//         <Searchbar onSubmit={getSearchRequest} />

//         {images && <ImageGallery images={images} openModal={openModal} />}

//         {isLoading && <Loader />}

//         {!isLoading && totalImages !== images.length && (
//           <Button onNextFetch={onNextFetch} />
//         )}

//         {showModal && (
//           <Modal
//             onClose={closeModal}
//             currentImageUrl={currentImageUrl}
//             currentImageDescription={currentImageDescription}
//           />
//         )}

//         <ToastContainer />
//       </>
//     );
//   }
// }

// export default App;
