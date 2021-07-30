import React from "react";
import { Button, Card, Col, Divider, Row, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";

import "./../assets/styles/cardItem.css";
import OvenGloveIcon from "./../assets/images/oven-glove.svg";

const CardItem = ({ item, setfullRecipe }) => (
  <Col flex="0 0 auto">
    {" "}
    <Card
      className="card-item"
      title={
        <div>
          <h3
            dangerouslySetInnerHTML={{
              __html: item?.title?.trim().replace(/[()]/g, ""),
            }}
          ></h3>
        </div>
      }
    >
      <Meta
        className="card-item__content"
        description={
          <span>
            {item?.NER?.filter(
              (item) => item.replace(/[^A-Za-z']/g, "").length > 0
            ).map((item, idx, NER) => {
              return (
                <span key={idx * Math.random() * 100}>
                  {item[0].toUpperCase() + item.substring(1)}
                  {idx !== NER.length - 1 ? "," : ""}
                </span>
              );
            })}
          </span>
        }
      />
      <Divider />
      <Meta
        className="card-item__footer"
        description={
          <Row justify="space-between">
            <Col span={12}>
              {" "}
              <span>
                <img
                  src={require("./../assets/images/external-link.png").default}
                  height="25px"
                  alt="external link"
                />
                <a
                  rel="noopener noreferrer"
                  href={"https://" + item.link}
                  target="_blank"
                >
                  Recipe Origin
                </a>
              </span>
            </Col>
            <Col span={8} pull={4}>
              <Tooltip title="See Full Recipe!">
                <Button
                  onClick={() =>
                    setfullRecipe({
                      isModalVisible: true,
                      recipeItem: item,
                    })
                  }
                  icon={
                    <img src={OvenGloveIcon} height="20px" alt="glove icon" />
                  }
                >
                  View Recipe
                </Button>
              </Tooltip>
            </Col>
          </Row>
        }
      />
    </Card>
  </Col>
);

export default CardItem;
