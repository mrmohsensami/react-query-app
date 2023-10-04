import { Form, Input, message } from "antd";
import { ChangePasswordApi } from "../../api";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const ChangePassword = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    console.log("Submitted values:", values);
    const result = await ChangePasswordApi(values.newPassword, values.password);
    result.data.status === 0 ? message.success(result.data.message) : message.error(result.data.message);
  };
  const validateConfirmPassword = (_: any, value: string) => {
    const newPassword = form.getFieldValue("newPassword");
    if (value && value !== newPassword) {
      return Promise.reject("رمز عبور مطابقت ندارد");
    }
    return Promise.resolve();
  };
  return (
    <div className="bg-white shadow-lg min-h-96 lg:w-4/12 mx-auto p-8">
      <Form form={form} onFinish={handleSubmit}>
        <div className="flex flex-col justify-center  ">
          <Form.Item
            {...formItemLayout}
            name="password"
            label="رمز عبور فعلی"
            rules={[
              { required: true, message: "وارد کردن این گزینه الزامی است" },
              { min: 6, message: "رمز عبور باید حداقل 6 کاراکتر باشد" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...formItemLayout} name="newPassword" label="رمز عبور جدید" rules={[{ required: true, message: "وارد کردن این گزینه الزامی است" }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...formItemLayout} name="confirmPassword" label="تکرار رمز عبور جدید" rules={[{ required: true, message: "وارد کردن این گزینه الزامی است" }, { validator: validateConfirmPassword }]}>
            <Input.Password />
          </Form.Item>

          <div>
            <button className="btn-primary mt-2 float-left">تغییر رمز</button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
