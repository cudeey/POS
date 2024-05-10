import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRecipes } from "../../store/slices/apiRecipes";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  

const RecipeDetails = () => {
  const { id } = useParams();
  const dataRecipes = useSelector((state) => state.apiRecipes.data.recipes);
  const dispatch = useDispatch();
  const [dataReady, setDataReady] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const baseUrl = "https://backrecrez.bbros.al";

  const [recipe, setRecipe] = useState();
  const foundRecipe =
    dataRecipes && dataRecipes.find((r) => r.id === parseInt(id));

  useEffect(() => {
    dispatch(fetchDataRecipes())
      .then(() => {
        setDataReady(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDataReady(true);
      });
  }, [dispatch]);

  useEffect(() => {
    if (foundRecipe) {
      const filteredPhotos =
        Array.isArray(foundRecipe?.video) && foundRecipe.video.length > 0
          ? foundRecipe.video.filter((photo) =>
              /\.(png|jpg|jpeg)$/i.test(photo.filename)
            )
          : [];

      let tempArray = filteredPhotos?.map((photo) => ({
        ...photo,
        url: photo?.url?.replaceAll(" ", "%20"),
      }));

      let temporaryObject = {
        ...foundRecipe,
        photos: tempArray || [],
      };

      setRecipe(temporaryObject);
    }
  }, [foundRecipe]);

  if (!dataReady) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const openLightbox = (index, media) => {
    setLightboxOpen(true);
    setLightboxIndex(index);
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="items-center justify-center flex">
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <p className="font-semibold text-4xl text-black leading-10 mb-5 mt-20">
            {recipe.title}
          </p>

          <p className="font-light text-2xl text-black leading-10 mb-6">
            {recipe.categories}
          </p>

          <div className="grid grid-cols-1 gap-y-3 gap-x-5 sm:grid-cols-5">
            <div className="border rounded-2xl w-[115px]  h-24 mr-[10px] flex border-orange-300 bg-light-pink">
              <div className="flex items-center p-1">
                <img
                  src="/images/dot-icon.svg"
                  alt="Dot"
                  className="mx-2 w-2 h-2"
                />
                <p className="font-medium text-base text-light-orange sm:text-sm sm:leading-6">
                  Ingredient
                </p>
              </div>
            </div>
            <div className="border rounded-2xl w-65 h-24 ml-6 flex border-orange-300 bg-light-pink">
              <div className="flex items-center p-1">
                <img
                  src="/images/dot-icon.svg"
                  alt="Dot"
                  className="mx-2 w-2 h-2"
                />
                <p className="font-medium text-base text-light-orange sm:text-sm sm:leading-6">
                  Qty
                </p>
              </div>
            </div>
            <div className="border rounded-2xl w-70 h-24 mr-[-40px] flex border-orange-300 bg-light-pink">
              <div className="flex items-center p-1">
                <img
                  src="/images/dot-icon.svg"
                  alt="Dot"
                  className="mx-2 w-2 h-2"
                />
                <p className="font-medium text-base text-light-orange sm:text-sm sm:leading-6">
                  Unit
                </p>
              </div>
            </div>
            <div className="border rounded-2xl w-70 h-24 ml-[-20px] flex border-orange-300 bg-light-pink">
              <div className="flex items-center p-1">
                <img
                  src="/images/dot-icon.svg"
                  alt="Dot"
                  className="mx-2 w-2 h-2"
                />
                <p className="font-medium text-base mr-2 text-light-orange sm:text-sm sm:leading-6">
                  Cost
                </p>
              </div>
            </div>
            <div className="border rounded-2xl w-[98px] h-24 ml-[-40px] flex border-orange-300 bg-light-pink">
              <div className="flex items-center p-1">
                <img
                  src="/images/dot-icon.svg"
                  alt="Dot"
                  className="mx-2 w-2 h-2"
                />
                <p className="font-medium text-base text-light-orange sm:text-sm sm:leading-6">
                  Supplier
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1">
              {recipe.quantities.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black-color sm:text-sm sm:leading-6"
                >
                  {ingredient.ingredient_name}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 ml-7">
              {recipe.quantities.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black-color sm:text-sm sm:leading-6"
                >
                  {ingredient.quantity}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1">
              {recipe.quantities.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black-color sm:text-sm sm:leading-6"
                >
                  {ingredient.unit}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1">
              {recipe.quantities.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black-color sm:text-sm sm:leading-6"
                >
                  {ingredient.cost}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1">
              {recipe.quantities.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black-color sm:text-sm sm:leading-6"
                >
                  {ingredient.companyName}
                </div>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 mt-9 ">
            <div className="">
              {recipe && (
                <ReactQuill
                  theme={null}
                  style={{ border: "none" }}
                  value={recipe.description}
                  modules={{}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 ml-44">
        <p className="text-base font-medium text-gray-color">All Media</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 w-456 mt-5 image-container">
          {Array.isArray(recipe.video) &&
            recipe.video.map((media, index) => (
              <div
                className="relative group"
                key={index}
                onClick={() => openLightbox(index, recipe.video)}
              >
                {/\.(png|jpg|jpeg)$/i.test(media.filename) ? (
                  <img
                    src={`${baseUrl}/${media.path}`}
                    alt={`Uploaded Image ${index}`}
                    className="w-full"
                  />
                ) : (
                  <video
                    key={index}
                    controls
                    width="100%"
                    height="100%"
                    src={`${baseUrl}/${media.path}`}
                    alt={`Uploaded Video ${index}`}
                  />
                )}
              </div>
            ))}
          {lightboxOpen && (
            <Lightbox
              mainSrc={
                recipe.video && recipe.video.length > 0
                  ? `${baseUrl}/${recipe.video[lightboxIndex].path}`
                  : ""
              }
              nextSrc={
                recipe.video && recipe.video.length > 1
                  ? `${baseUrl}/${
                      recipe.video[(lightboxIndex + 1) % recipe.video.length]
                        .path
                    }`
                  : ""
              }
              prevSrc={
                recipe.video &&
                recipe.video.length > 1 &&
                `${baseUrl}/${
                  recipe.video[
                    (lightboxIndex + recipe.video.length - 1) %
                      recipe.video.length
                  ].path
                }`
              }
              onCloseRequest={() => setLightboxOpen(false)}
              onMovePrevRequest={() =>
                setLightboxIndex(
                  (lightboxIndex + (recipe.video || []).length - 1) %
                    (recipe.video || []).length
                )
              }
              onMoveNextRequest={() =>
                setLightboxIndex(
                  (lightboxIndex + 1) % (recipe.video || []).length
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
