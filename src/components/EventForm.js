import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, TimePicker, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { RangePicker } = TimePicker;

function EventForm() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState(new Date());

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  function submitForm(values) {
    const { title, description, eventTime } = values;
    const formData = {
      title,
      description,
      image: imageUrl,
      date,
      eventTime
    };

    //TODO: API call here
  }

  function timeSelect(value) {
    setDate(value._d);
  }

  function uploadPicture(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const cloudinaryRequest = e => {
    const formData = new FormData();
    formData.append('upload_preset', 'xv3k736w');
    formData.append('file', e.file);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(response => response.json())
      .then(data => {
        setImageUrl(data.url);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ margin: '50px auto auto auto', paddingBottom: '3vh' }}>
        Create a new event
          </h1>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        {...layout}
        style={{ width: '60vw', height: '50vh' }}
        onFinish={submitForm}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
        </Form.Item>
        <Form.Item name="upload" label="Profile picture">
          <Upload
            name="avatar"
            customRequest={cloudinaryRequest}
            accept=".png, .jpg, .jpeg"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={uploadPicture}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
                uploadButton
              )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="eventTime"
          label="Date"
          rules={[{ required: true }]}
        >
          <DatePicker onOk={timeSelect} />
        </Form.Item>
        <Form.Item
          name="eventTime"
          label="Time"
          rules={[{ required: true }]}
        >
          <RangePicker format='hh:mm' />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EventForm;