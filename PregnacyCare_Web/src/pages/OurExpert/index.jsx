"use client";

import { useState } from "react";
import {
  SearchOutlined,
  CloseCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Input, Tabs, Button, Modal, Checkbox } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function OurExpert() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = [
    { label: "Articles", value: "Articles" },
    { label: "Tools", value: "Tools" },
    { label: "Videos", value: "Videos" },
    { label: "Slideshows", value: "Slideshows" },
    { label: "Topics", value: "Topics" },
    { label: "Polls", value: "Polls" },
    { label: "Quizzes", value: "Quizzes" },
    { label: "Contributors", value: "Contributors" },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", selectedFilters);
    setIsModalVisible(false);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="container py-4">
      <div className="relative w-full mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search expert..."
          size="large"
          className="pr-10"
          suffix={
            searchTerm && (
              <CloseCircleOutlined
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              />
            )
          }
        />
      </div>

      <Tabs
        defaultActiveKey="expert"
        items={[
          { key: "expert", label: "Expert" },
          { key: "community", label: "Community" },
        ]}
        className="mb-4"
      />

      <div className="flex justify-between items-center mb-4">
        <Button
          icon={<FilterOutlined />}
          onClick={showModal}
          className="flex items-center gap-2"
        >
          Filter
        </Button>
        <span className="text-gray-500 text-sm">1-1137 of 1,137</span>
      </div>

      <Modal
        title={<h2 className="fw-bold fs-4">Filter</h2>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="apply"
            type="primary"
            onClick={handleApplyFilters}
            className="btn btn-primary rounded-pill w-100 py-2"
          >
            Apply
          </Button>,
          <Button
            key="clear"
            type="link"
            onClick={handleClearFilters}
            className="text-decoration-underline text-primary w-100"
          >
            Clear filter
          </Button>,
        ]}
        closeIcon={<CloseCircleOutlined className="text-muted fs-5" />}
        className="custom-modal"
      >
        <Checkbox.Group
          className="d-flex flex-column gap-2"
          options={filterOptions}
          value={selectedFilters}
          onChange={handleCheckboxChange}
        />
      </Modal>

      <div className="d-flex flex-column gap-4">
        <article className="border-bottom pb-4">
          <div className="text-secondary small mb-2">ARTICLE</div>
          <h2 className="h5 mb-2">
            Lip ties in babies: Here's why experts say worrying (and surgery!)
          </h2>
          <p className="mb-0">But medical experts say this isn't the case.</p>
        </article>

        <div className="border-bottom pb-4">
          <div className="text-secondary small mb-2">CONTRIBUTOR</div>
          <h2 className="h5 mb-2">BabyCenter Featured Expert</h2>
          <p className="mb-0">
            The advertiser and/or the expert brought to you by the advertiser
            are solely responsible for this content.
          </p>
        </div>

        <div className="border-bottom pb-4">
          <div className="text-secondary small mb-2">POLL</div>
          <h2 className="h5 mb-2">Who's your favorite parenting expert?</h2>
          <p className="mb-0">Who's your favorite parenting expert?</p>
        </div>

        <article className="border-bottom pb-4">
          <div className="text-secondary small mb-2">ARTICLE</div>
          <h2 className="h5 mb-2">
            Expert strategies for getting your baby to sleep
          </h2>
          <p className="mb-0">
            Whether you're figuring out the best way to get your baby to settle
            in for the night or trying to get them to go down easy after a
            midnight feeding, these tips, drawn from a number of leading baby...
          </p>
        </article>

        <article className="border-bottom pb-4">
          <div className="d-flex gap-3">
            <div className="flex-grow-1">
              <div className="text-secondary small mb-2">VIDEO</div>
              <h2 className="h5 mb-2">
                The best toys for 2-year-olds from a developmental play expert
              </h2>
              <p className="mb-0">
                Jill Lerman, a developmental play expert, shares her top
                recommendations to inspire creativity, learning, and endless
                fun!
              </p>
            </div>
            <div
              className="position-relative"
              style={{ minWidth: "120px", height: "80px" }}
            ></div>
          </div>
        </article>

        <article className="border-bottom pb-4">
          <div className="text-secondary small mb-2">ARTICLE</div>
          <h2 className="h5 mb-2">
            Can an injection of your own platelets help you get pregnant?
          </h2>
          <p className="mb-0">Here's what experts want you to know.</p>
        </article>

        <article className="border-bottom pb-4">
          <div className="text-secondary small mb-2">ARTICLE</div>
          <h2 className="h5 mb-2">
            Do identical twins have the same fingerprints?
          </h2>
          <p className="mb-0">
            Experts aren't sure exactly why this occurs, but some believe that
            fingerprints ultimately increase our sensitivity to touch.
          </p>
        </article>

        <div className="border-bottom pb-4">
          <div className="text-secondary small mb-2">CONTRIBUTOR</div>
          <h2 className="h5 mb-2">Jennifer Iserloh</h2>
        </div>
      </div>
    </div>
  );
}
