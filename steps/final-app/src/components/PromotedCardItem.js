import React from "react";
import { Card, Col, Row, Tag, Tooltip } from "antd";
import { getHostname } from "../helper/functions";
import "./../assets/styles/promotedCardItem.css";

const PromotedCardItem = ({ item }) => {
  return (
    <Col span={24}>
      {" "}
      <Card className="promoted-card" title={null}>
        {" "}
        <Row
          justify="space-between"
          align="middle"
          className="promoted-card__first-row"
          wrap={false}
        >
          <h3>
            <img
              alt="speaker-icon"
              src="https://img.icons8.com/emoji/48/000000/speaker-medium-volume.png"
            />
            <span>{item.title.trim().replace(/[()]/g, "")}</span>
          </h3>
          <Tag color="red" className="promoted-tag">
            Promoted
          </Tag>
        </Row>
        <Row
          justify="space-between"
          align="bottom"
          className="promoted-card__second-row"
          wrap={false}
        >
          {" "}
          <span>
            Sponsored by :{" "}
            <Tooltip title="See Full Recipe!">
              {" "}
              <a rel="noopener noreferrer" href={item.link} target="_blank">
                {getHostname(item.link)}
              </a>{" "}
            </Tooltip>
          </span>
          <i> Powered by Query Rules</i>
        </Row>
      </Card>
    </Col>
  );
};

export default PromotedCardItem;
