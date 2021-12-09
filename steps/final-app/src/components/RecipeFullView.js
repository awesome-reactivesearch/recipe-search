import "./../assets/styles/recipeFullView.css";

import CookingIcon from "./../assets/images/cooking.svg";
import IngredientIcon from "./../assets/images/ingredients.svg";
import Modal from "antd/lib/modal/Modal";
import React from "react";

const RecipeFullView = ({
  isModalVisible = false,
  recipeItem = {},
  onClose = () => console.log("Provide an onclose handler"),
}) => {
  return (
    Object.keys(recipeItem).length > 0 && (
      <Modal
        className="recipe-modal"
        title={
          <span
            className="recipe-modal__title"
            dangerouslySetInnerHTML={{
              __html: recipeItem.title.trim().replace("/(*)/g", ""),
            }}
          ></span>
        }
        visible={isModalVisible}
        onCancel={onClose}
        footer={
          <span>
            <img
              src={'https://i.imgur.com/pX4jJnA.png'}
              height="35px"
            />
            <a
              href={"https://" + recipeItem.link}
              target="_blank"
              rel="noreferrer"
            >
              Recipe Origin
            </a>
          </span>
        }
      >
        <div>
          <h3>Ingredients</h3>
          <ul className="">
            {recipeItem.ingredients.map((item) => {
              return (
                <li key={item}>
                  <img src={IngredientIcon} height="15px" />
                  {item[0].toUpperCase() + item.substring(1)}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Cook this Way!</h3>
          <ul>
            {recipeItem.directions.map((item) => {
              return (
                <li key={item}>
                  <img src={CookingIcon} height="20px" />
                  {item[0].toUpperCase() + item.substring(1)}
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    )
  );
};

export default RecipeFullView;
