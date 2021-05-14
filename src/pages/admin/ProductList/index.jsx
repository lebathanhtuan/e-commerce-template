import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Table, Button, Space, Drawer, Form, Input, Select, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import {
  getProductListAdminAction,
  getCategoryListAdminAction,
  createProductAdminAction,
  editProductAdminAction,
  deleteProductAdminAction,
} from '../../../redux/actions'

function ProductListPage({
  getCategoryListAdmin,
  getProductListAdmin,
  createProductAdmin,
  editProductAdmin,
  deleteProductAdmin,
  productList,
  categoryList,
}) {
  const [isShowModify, setIsShowModify] = useState(false);
  // {} là create / Object có data là edit
  const [productSelected, setProductSelect] = useState({});

  const [productForm] = Form.useForm();

  useEffect(() => {
    getProductListAdmin();
    getCategoryListAdmin();
  }, []);

  useEffect(() => {
    productForm.resetFields();
  }, [productSelected.id]);

  function handleEditProduct(record) {
    setIsShowModify(true);
    setProductSelect(record);
  }

  function handleCreateProduct() {
    setIsShowModify(true);
    setProductSelect({});
  }

  function handleSubmitForm() {
    const values = productForm.getFieldsValue();
    if (productSelected.id) {
      editProductAdmin({ id: productSelected.id, ...values });
    } else {
      createProductAdmin(values)
    }
    setIsShowModify(false);
  }

  const tableColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Giá',
      dataIndex: 'minMaxPrice',
      key: 'minMaxPrice',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" ghost onClick={() => handleEditProduct(record)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Bạn có chắc muốn xóa ${record.name}`}
              onConfirm={() => deleteProductAdmin({ id: record.id })}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger ><DeleteOutlined /></Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  const tableData = productList.data.map((productItem) => {
    let minValue = 0;
    let maxValue = 0;
    productItem.productOptions.forEach((option) => {
      if (option.price > maxValue) maxValue = option.price;
      if (option.price < minValue) minValue = option.price;
    })
    return {
      ...productItem,
      key: productItem.id,
      categoryName: productItem.category.name,
      minMaxPrice: productItem.productOptions.length > 0
        ? `${(productItem.price + minValue).toLocaleString()} - ${(productItem.price + maxValue).toLocaleString()}`
        : productItem.price.toLocaleString()
    }
  });

  function renderCategoryOptions() {
    return categoryList.data.map((categoryItem, categoryIndex) => {
      return (
        <Select.Option key={categoryIndex} value={categoryItem.id}>
          {categoryItem.name}
        </Select.Option>
      )
    })
  }

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <div>Danh sách sản phẩm</div>
        <Button type="primary" onClick={() => handleCreateProduct()}>Thêm sản phẩm</Button>
      </Row>
      <Table loading={productList.load} columns={tableColumns} dataSource={tableData} />
      <Drawer
        title="Chỉnh sửa sản phẩm"
        width={500} 
        visible={isShowModify}
        onClose={() => setIsShowModify(false)}
        footer={(
          <Row justify="end">
            <Space>
              <Button>Hủy</Button>
              <Button type="primary" onClick={() => handleSubmitForm()}>Lưu</Button>
            </Space>
          </Row>
        )}
      >
        <Form
          form={productForm}
          layout="vertical"
          name="productForm"
          initialValues={productSelected.id
            ? {...productSelected}
            : {}
          }
        >
          <Form.Item name="name" label="Tên sản phẩm">
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item name="categoryId" label="Loại sản phẩm">
            <Select placeholder="Loại sản phẩm">
              {renderCategoryOptions()}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productList, categoryList } = state.adminProductReducer;
  return {
    productList,
    categoryList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
    getCategoryListAdmin: (params) => dispatch(getCategoryListAdminAction(params)),
    createProductAdmin: (params) => dispatch(createProductAdminAction(params)),
    editProductAdmin: (params) => dispatch(editProductAdminAction(params)),
    deleteProductAdmin: (params) => dispatch(deleteProductAdminAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
