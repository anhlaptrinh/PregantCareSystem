import { useEffect, useState } from "react";
import { Tabs } from "antd";
import AskForm from "./AskForm";
import { useGetCategories } from "../../../apis/CallAPICategory";
import { useCreateAdvice } from "../../../apis/CallAPIAdvice";
import { message as Message } from "antd";
export default function AdviceForm({ selectedFetus }) {
  const [categories, setCategories] = useState([]);

  const handleSubmitQuestion = async (title, description, categoryId) => {
    let advice = {
      fetusId: selectedFetus.id,
      categoryId: categoryId,
      title: title,
      description: description,
    };
    try {
      const res = await useCreateAdvice(advice);
      if (res.code == 200) {
        Message.success(res.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAllCategories = async () => {
    const res = await useGetCategories();
    if (res.code == 200) {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Tabs defaultActiveKey="ask" centered>
        <Tabs.TabPane tab="Asking" key="ask">
          <AskForm onSubmit={handleSubmitQuestion} categories={categories} />
        </Tabs.TabPane>
      </Tabs>
    </main>
  );
}
