"use client";

import { Avatar, Card, Collapse, Typography, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function ArticlePage() {
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#">Baby</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">NewBorn</a>
                            </li>
                        </ol>
                    </nav>

                    {/* Article Header */}
                    <Title level={1} className="mb-4">
                        Lip ties in babies: Here's why experts say worrying (and
                        surgery!) isn't needed
                    </Title>

                    {/* Article Meta */}
                    <Space direction="vertical" className="w-100 mb-4">
                        <Text className="text-muted">
                            You may have heard that lip ties cause breastfeeding
                            and other issues - but experts disagree. Here's what
                            you need to know, especially if you're considering a
                            procedure to fix your baby's lip tie.
                        </Text>
                        <Space className="align-items-center">
                            <Avatar
                                src="https://assets.babycenter.com/ims/2022/08/kate-shand-profile-picture.jpg?width=80"
                                size="small"
                            />
                            <Text className="text-muted">
                                Medically reviewed by Kate Shand, physician
                                assistant and lactation consultant
                            </Text>
                        </Space>
                        <Space className="align-items-center">
                            <Avatar
                                src="https://assets.babycenter.com/ims/2021/08/Karen-Miles-bio.jpeg?width=80"
                                size="small"
                            />
                            <Text className="text-muted">
                                Written by Karen Miles | Jan 28, 2025
                            </Text>
                        </Space>
                    </Space>

                    {/* Featured Image */}
                    <Card className="mb-4 border-0">
                        <img
                            src="https://assets.babycenter.com/ims/2015/12/iStock_5280082_wide.jpg?width=850"
                            alt="Baby yawning"
                            width={800}
                            height={400}
                            className="img-fluid rounded"
                        />
                        <Text className="text-muted mt-2 d-block">
                            Photo credit: Henry
                        </Text>
                    </Card>

                    <Collapse
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        className="bg-light border-0"
                        style={{ width: "100%" }}
                    >
                        <Panel header="In this article" key="1">
                            <ul className="list-unstyled mb-0">
                                <li className="mb-2">
                                    <a href="#what-is">What is a lip tie?</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#causes">
                                        What causes lip ties in babies?
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#diagnosis">
                                        How is a lip tie diagnosed in babies?
                                    </a>
                                </li>
                                <li>
                                    <a href="#treatment">
                                        Should lip ties in babies be corrected?
                                    </a>
                                </li>
                            </ul>
                        </Panel>
                    </Collapse>

                    <div>
                        <p1>
                            If you're concerned about your baby having a lip
                            tie, you're not alone. More and more parents are
                            becoming aware of tongue ties and lip ties these
                            days, often wondering if they could cause any issues
                            with breastfeeding.
                        </p1>
                        <p>
                            But according to many experts, these worries are
                            overblown.
                        </p>
                        <p></p>
                    </div>

                    <Card className="mb-4 border-0">
                        <img
                            src="https://assets.babycenter.com/ims/2020/06/iStock-1206853356_wide.jpg?width=650"
                            alt="Baby yawning"
                            width={800}
                            height={400}
                            className="img-fluid rounded"
                        />
                        <Text className="text-muted mt-2 d-block">
                            Photo credit: Henry
                        </Text>
                    </Card>

                    <div>
                        <p>
                            "The vast majority of moms I see ask how their
                            baby's tongue looks," says Kate Shand, an
                            international board-certified lactation consultant.
                            "While it's natural to examine your baby closely –
                            10 fingers and 10 toes, check! – the recent
                            explosion of interest in babies' oral anatomy has
                            led to the unfortunate overdiagnosis of tongue, lip,
                            and cheek ties."
                        </p>

                        <p>
                            Fact is, even if your newborn does have a lip tie,
                            there's no evidence that it will cause any problems
                            for your baby or interfere with their ability to
                            breastfeed successfully.
                        </p>
                    </div>

                    {/* Article Content */}
                    <article className="mb-4">
                        <Title level={2} id="what-is" className="mb-3">
                            What is a lip tie?
                        </Title>
                        <Paragraph>
                            A lip tie is an extra short or tight labial frenulum
                            - that's the triangle-shaped piece of connective
                            tissue that attaches your baby's upper lip to their
                            gum.
                        </Paragraph>

                        <iframe
                            width="250"
                            height="615"
                            src="https://www.youtube.com/embed/dHwsOMmXjGQ?si=SxQC0cx8wXYeOFU7"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>

                        <Title level={2} id="causes" className="mb-3">
                            What causes lip ties in babies?
                        </Title>
                        <Paragraph>
                            A lip tie (or labial frenulum) formed while your
                            baby was still developing in the womb. Normally, the
                            frenula get thinner and recede before a baby is
                            born, separating their lip from their gums. No one
                            knows why some babies still have a lip tie at birth.
                        </Paragraph>

                        <p>
                            A lip tie (or labial frenulum) formed while your
                            baby was still developing in the womb. Normally, the
                            frenula get thinner and recede before a baby is
                            born, separating their lip from their gums. No one
                            knows why some babies still have a lip tie at birth.
                        </p>
                        <p>
                            Genes might be at least partly responsible for lip
                            ties, which&nbsp;often run in families. There's been
                            some assumption that tongue ties and lip ties often
                            occur together in the same baby, but there's no good
                            data to support that claim. In fact, one{" "}
                            <a
                                href="https://pubmed.ncbi.nlm.nih.gov/33006413/"
                                target="_blank"
                                rel="noopener"
                            >
                                study
                                <span class="newWindowWarning">
                                    Opens a new window
                                </span>
                            </a>{" "}
                            of 100 newborns with lip tie found no correlation.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
