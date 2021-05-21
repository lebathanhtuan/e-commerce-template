import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Button,
  Space,
  Popconfirm,
  Card,
  Form,
  Input,
  InputNumber,
} from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

import {
  editOptionAdminAction,
  deleteOptionAdminAction,
} from '../../../redux/actions';

function ProductOptionItem({
  optionItem,
  editOptionAdmin,
  deleteOptionAdmin,
  productId,
}) {
  const [isEditForm, setIsEditForm] = useState(false);

  if (isEditForm) {
    return (
      <Card
        title="Cập nhật"
        size="small"
        style={{ marginBottom: 8 }}
      >
        <Form
          name="editProductOption"
          initialValues={optionItem}
          onFinish={(values) => {
            editOptionAdmin({
              id: optionItem.id,
              productId,
              ...values,
            });
            setIsEditForm(false);
          }}
        >
          <Form.Item name="title" label="Tùy chọn">
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item name="price" label="Giá thêm">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsEditForm(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }

  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <Row justify="space-between">
        <Space>
          <div>{optionItem.title}</div>
          <div>{optionItem.price}</div>
        </Space>
        <Space>
          <Button type="text" size="small" onClick={() => setIsEditForm(true)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title={`Bạn có chắc muốn xóa ${optionItem.title}`}
            onConfirm={() => deleteOptionAdmin({ id: optionItem.id })}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" size="small" danger ><CloseOutlined /></Button>
          </Popconfirm>
        </Space>
      </Row>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOptionAdmin: (params) => dispatch(editOptionAdminAction(params)),
    deleteOptionAdmin: (params) => dispatch(deleteOptionAdminAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptionItem);
