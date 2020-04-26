import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, TimePicker, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { addEvent } from '../../redux/actions';
import { useStitchAuth } from '../StitchAuth/StitchAuth';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const { TextArea } = Input;
const { RangePicker } = TimePicker;

function EventForm() {
  const dispatch = useDispatch();
  const { currentUser } = useStitchAuth();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };

  async function submitForm(values) {
    const {
      title,
      description,
      eventTime,
      eventDate,
      artistName,
      streamUrl
    } = values;
    const formData = {
      artistName,
      title,
      description,
      streamUrl,
      image: imageUrl,
      date: new Date(
        eventDate.format('MMMM D, YYYY ') + eventTime[0].format('HH:mm') + ':00'
      ),
      endTime: new Date(
        eventDate.format('MMMM D, YYYY ') + eventTime[1].format('HH:mm') + ':00'
      )
    };

    dispatch(addEvent(formData, currentUser.id));
    setSubmitted(true);
  }

  function uploadPicture(info) {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const cloudinaryRequest = (e) => {
    const formData = new FormData();
    formData.append('upload_preset', 'eumh276f');
    formData.append('file', e.file);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Route>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
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
          <Form.Item
            name="artistName"
            label="Artist's Name"
            rules={[
              { required: true, message: "Please write the artist's name" }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please write the event's title" }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please write a description for the event'
              },
              {
                min: 50,
                message: 'Description must be at least 50 characters long'
              }
            ]}
          >
            <TextArea autoSize={{ minRows: 4, maxRows: 7 }} />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Profile picture"
            rules={[
              {
                required: true,
                message: 'Please upload a picture for the event'
              }
            ]}
          >
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
            name="streamUrl"
            label="Stream URL"
            rules={[
              { required: true, message: 'Please input a stream URL' },
              {
                type: 'url',
                message: 'Please input a valid stream URL.'
              }
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="patreonUrl"
            label="Patreon URL"
            rules={[
              { required: true, message: 'Please input a valid Patreon URL' },
              {
                type: 'url',
                essage: 'Please input a valid Patreon URL'
              }
            ]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="eventDate"
            label="Date"
            rules={[
              { required: true, message: 'Please choose a date for the event' }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="eventTime"
            label="Time"
            rules={[
              {
                required: true,
                message: 'Please choose a time range for the event'
              }
            ]}
          >
            <RangePicker format="HH:mm" />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Route>
  );
}

export { EventForm as default };
