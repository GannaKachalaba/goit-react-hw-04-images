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
          setImages(prevImages => [...prevImages, ...imagesArray]);
        })
        .catch(error => setError(toast.error(error)))
        .finally(() => setIsLoading(false));
    }
  }, [query, page, error]);

  const getSearchRequest = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onNextFetch = () => {
    setPage(page => page + 1);
  };

  const closeModal = () => {
    setShowModal(!showModal);
    setCurrentImageUrl(null);
    setCurrentImageDescription(null);
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
