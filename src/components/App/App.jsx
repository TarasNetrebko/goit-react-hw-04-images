import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loading } from '../Loading/Loading';
import { ToastContainer } from 'react-toastify';
import { Modal } from '../Modal/Modal';
import css from "./App.module.css"
export const App = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [stage, setStage] = useState("idle");
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (filter === "") {
      return;
    }
    setImages([]);
    setPage(1);
      fetchImagesHandler()
        .catch(error => console.log)
        .then(newArray => {
          if (newArray.length === 0) {
            setStage("rejected")
          } else {
            setImages(newArray);
            setStage("resolved");
          }
        });
    // eslint-disable-next-line
  },[filter])

  useEffect(() => {
    if (page > 1) {
      fetchImagesHandler().then(newArray =>
        {setStage("resolved")
        setImages([...images, ...newArray])}
        )      
    }
    // eslint-disable-next-line
  }, [page])

  const openModal = img => {
    setCurrentImage(img)
  };
  const closeModal = () => {
    setCurrentImage("")
  };
  async function fetchImagesHandler() {
    setStage("pending");
    return await fetch(
      `https://pixabay.com/api/?q=${filter}&page=${page}&key=28124365-0ad47717ab252182c329a634e&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(({ hits }) =>
        hits.map(({ id, webformatURL, largeImageURL }) => {
          return {
            id: id,
            webformatUrl: webformatURL,
            largeImageURL: largeImageURL,
          };
        })
      );
  }
  const searchSubmitHandler = filter => {
    setFilter(filter);
    setPage(1);
  };
  function loadMoreHandler() {
    setPage((page) => page + 1);
  }
    if (stage === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={searchSubmitHandler} />
          <span>To show gallery of images, please enter a search term</span>
          <ToastContainer autoClose={3000} />
        </div>
      );
    }
    if (stage === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={searchSubmitHandler} />
          {images.length > 0 && (
            <ImageGallery images={images} />
          )}
          <Loading />
        </div>
      );
    }
    if (stage === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={searchSubmitHandler} />
          <ImageGallery
            images={images}
            onOpenModal={openModal}
          />
          <Button onLoadMore={() => loadMoreHandler()} />
          {currentImage && (
            <Modal largeImg={currentImage} onClose={closeModal} />
          )}
          <ToastContainer autoClose={3000} />
        </div>
      );
    }
    if (stage === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={searchSubmitHandler} />
          <img
            src="https://akns-images.eonline.com/eol_images/Entire_Site/201467/rs_560x415-140707115516-560.Purrmanently-Sad-Cat-kitten.ls.7814.jpg?fit=around%7C560:415&output-quality=90&crop=560:415;center,top"
            alt="sadKitten"
            width="400"
            height="300"
          />
          <span>There is no matches with: {filter}</span>
          <ToastContainer autoClose={3000} />
        </div>
      );
    }
  }
