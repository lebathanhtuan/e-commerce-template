import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Table,
  Button,
  Space,
  Drawer,
  Form,
  Input,
  Select,
  Popconfirm,
  List,
  InputNumber,
  Checkbox,
  Card,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import ProductOptionItem from './ProductOptionItem';

import {
  getProductListAdminAction,
  getCategoryListAdminAction,
  createProductAdminAction,
  editProductAdminAction,
  deleteProductAdminAction,
  createOptionAdminAction,
  setProductSelectAction,
} from '../../../redux/actions'

function ProductListPage({
  getCategoryListAdmin,
  getProductListAdmin,
  createProductAdmin,
  editProductAdmin,
  deleteProductAdmin,
  productList,
  categoryList,
  createOptionAdmin,
  setProductSelect,
  productSelected,
}) {
  const [isShowModify, setIsShowModify] = useState(false);
  // {} là create / Object có data là edit
  const [isOptionForm, setIsOptionForm] = useState(false);
  const [isShowCreateOption, setIsShowCreateOption] = useState(false);

  const [productForm] = Form.useForm();

  useEffect(() => {
    getProductListAdmin();
    getCategoryListAdmin();
  }, []);

  useEffect(() => {
    if (isShowModify) {
      setIsShowCreateOption(false)
    }
  }, [isShowModify]);

  useEffect(() => {
    productForm.resetFields();
    setIsOptionForm(productSelected.productOptions?.length > 0);
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
        ? productItem.productOptions.length === 1 
          ? (productItem.price + maxValue).toLocaleString()
          : `${(productItem.price + minValue).toLocaleString()} - ${(productItem.price + maxValue).toLocaleString()}`
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

  function renderCreateOptionForm() {
    return (
      <Card size="small" title="Thêm mới">
        <Form
          name="createProductOption"
          onFinish={(values) => {
          console.log('🚀 ~ file: index.jsx ~ line 187 ~ renderCreateOptionForm ~ values', values);
            createOptionAdmin({
              productId: productSelected.id,
              ...values,
              setProductSelect,
            })
            setIsShowCreateOption(false);
          }}
        >
          <Form.Item
            name="title"
            label="Tùy chọn"
            rules={[{ required: true, message: 'Bạn chưa điền tên của tùy chọn' }]}
          >
            <Input placeholder="Tùy chọn" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá thêm"
            rules={[{ required: true, message: 'Bạn chưa điền giá của tùy chọn' }]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá thêm"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button onClick={() => setIsShowCreateOption(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">Thêm</Button>
            </Space>
          </Row>
        </Form>
      </Card>
    )
  }

  function renderProductOptionItems() {
    return productSelected.productOptions.map((optionItem, optionIndex) => {
      return (
        <ProductOptionItem
          key={optionIndex}
          optionItem={optionItem}
          productId={productSelected.id}
        />
      )
    })
  }

  function renderProductOptionForm() {
    return (
      <div style={{ marginTop: 16 }}>
        <h4>Danh sách tùy chọn</h4>
        {
          productSelected.id &&
          productSelected.productOptions.length > 0 &&
            renderProductOptionItems()
        }
        {isShowCreateOption
          ? renderCreateOptionForm()
          : (
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => setIsShowCreateOption(true)}
            >
              Thên tùy chọn
            </Button>
          )
        }
      </div>
    )
  }

  return (
    <>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <div>Danh sách sản phẩm</div>
        <Button type="primary" onClick={() => handleCreateProduct()}>Thêm sản phẩm</Button>
      </Row>
      <Table
        loading={productList.load}
        columns={tableColumns}
        dataSource={tableData}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <List
                size="small"
                dataSource={record.productOptions}
                renderItem={(item) => (
                  <List.Item>
                    <Row justify="space-between" style={{ width: '100%' }}>
                      <div>{item.title}</div>
                      <div>{(record.price + item.price).toLocaleString()}</div>
                    </Row>
                  </List.Item>
                )}
              />
            )
          },
          rowExpandable: (record) => record.productOptions.length > 0
        }}
      />
      <Drawer
        title={productSelected.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
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
            ? {...productSelected, hasOption: false }
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
          <Form.Item name="price" label="Giá gốc">
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              placeholder="Giá gốc"
              style={{ width: '100%' }}
            />
          </Form.Item>
          {productSelected.id && (
            <Checkbox checked={isOptionForm} onChange={(e) => setIsOptionForm(e.target.checked)}>Tuỳ chọn</Checkbox>
          )}
        </Form>
        {isOptionForm && productSelected.id && renderProductOptionForm()}
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  const { productList, categoryList } = state.adminProductReducer;
  const { productSelected } = state.adminCommonReducer;
  return {
    productList,
    categoryList,
    productSelected,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductListAdmin: (params) => dispatch(getProductListAdminAction(params)),
    getCategoryListAdmin: (params) => dispatch(getCategoryListAdminAction(params)),
    createProductAdmin: (params) => dispatch(createProductAdminAction(params)),
    editProductAdmin: (params) => dispatch(editProductAdminAction(params)),
    deleteProductAdmin: (params) => dispatch(deleteProductAdminAction(params)),
    createOptionAdmin: (params) => dispatch(createOptionAdminAction(params)),
    setProductSelect: (params) => dispatch(setProductSelectAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
