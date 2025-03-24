"use client";

import { Avatar, Card, Collapse, Typography, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import moment from "moment";
import BackdropLoader from "../../component/BackdropLoader";
import { useGetArticleDetail } from "../../apis/CallAPIBlog";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function ArticlePage() {
  const { slug } = useParams();

  // Sử dụng React Query để lấy chi tiết bài viết
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articleDetail", slug],
    queryFn: async () => {
      if (!slug) console.log("Missing slug");
      const res = await useGetArticleDetail(slug);
      if (res.code === 200) {
        return res.data;
      } else {
        console.log("Error fetching article detail");
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // dữ liệu fresh trong 5 phút
  });

  if (isLoading) return <BackdropLoader open={isLoading} />;
  if (error) return <div>Error: {error.message}</div>;

  // Sắp xếp các section theo displayOrder (nếu có)
  const sortedSections = article?.articleSections
    ?.slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="container py-4">
      {article ? (
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Article Header */}
            <Title level={1} className="mb-4">
              {article.title}
            </Title>

            {/* Article Meta */}
            <Space direction="vertical" className="w-100 mb-4">
              <Text className="text-muted">{article.description}</Text>
              <Space className="align-items-center">
                <Avatar
                  src="https://assets.babycenter.com/ims/2021/08/Karen-Miles-bio.jpeg?width=80"
                  size="small"
                />
                <Text className="text-muted">
                  Written by {article.user?.fullName || "Unknown"} |{" "}
                  {moment(article.datePublish).format("MMMM D, YYYY")}
                </Text>
              </Space>
            </Space>

            {/* Featured Image */}
            <Card className="mb-4 border-0">
              <img
                src="https://assets.babycenter.com/ims/2015/12/iStock_5280082_wide.jpg?width=850"
                alt="Article Featured"
                width={800}
                height={400}
                className="img-fluid rounded"
              />
              <Text className="text-muted mt-2 d-block">
                Photo credit: Henry
              </Text>
            </Card>

            {/* Danh mục lưu trữ (mục lục bài viết) */}
            {sortedSections && sortedSections.length > 0 && (
              <Collapse
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="bg-light border-0"
                style={{ width: "100%" }}
              >
                <Panel header="In this article" key="1">
                  <ul className="list-unstyled mb-0">
                    {sortedSections.map((section) => (
                      <li key={section.id} className="mb-2">
                        <a href={`#${section.anchor}`}>
                          {section.sectionTitle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Collapse>
            )}

            {/* Nội dung bài viết */}
            <article className="mb-4">
              {sortedSections?.map((section) => (
                <div key={section.id}>
                  <Title level={2} id={section.anchor} className="mb-3">
                    {section.sectionTitle}
                  </Title>
                  <Paragraph>{section.description}</Paragraph>
                </div>
              ))}
            </article>
          </div>
        </div>
      ) : (
        <div>No article found.</div>
      )}
    </div>
  );
}
