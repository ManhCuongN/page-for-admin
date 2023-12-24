import { useContext, useEffect, useState } from "react";
import { message, Upload, Form } from 'antd';
import CustomUpload from "components/CustomUpload";

const TestFr = () => {
    const [form] = Form.useForm();
    const nameValue = Form.useWatch("name", form);
    console.log("name", nameValue);
    return (
                    <Form form={form} >
                      <Form.Item label="Checkbox" name="name">
                        <CustomUpload />
                      </Form.Item>
                      </Form>
    )

}

export default TestFr