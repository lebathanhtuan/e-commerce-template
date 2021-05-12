import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Button } from 'antd';

import history from '../../../utils/history';

import { getCategoryListAction } from '../../../redux/actions';
import { getProductListAction } from '../../../redux/actions';

function ProductListPage({
  getCategoryList,
  getProductList,
  categoryList,
  productList,
}) {
  const [categorySelected, setCategorySelected] = useState(undefined);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    getCategoryList();
    getProductList({
      page: 1,
      limit: 4,
    });
  }, []);

  function handleFilterCategory(id) {
    setCategorySelected(id);
    // setPage(1);
    getProductList({
      page: 1,
      limit: 4,
      categoryId: id,
    });
  }

  function handleShowMore() {
    // setPage(page + 1);
    getProductList({
      more: true,
      // page: page + 1,
      page: productList.page + 1,
      limit: 4,
      categoryId: categorySelected,
    });
  }

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, productIndex) => {
      return (
        <Col span={6}>
          <Card
            size="small"
            title={productItem.name}
            onClick={() => history.push(`/product/${productItem.id}`)}
          >
            <p>{productItem.name}</p>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Row gutter={16} style={{ padding: '0 16px' }}>
      <Col span={4}>
        <List
          size="small"
          header={<div>Hãng</div>}
          bordered
          dataSource={[
            { name: 'Tất cả' },
            ...categoryList.data,
          ]}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleFilterCategory(item.id)}
              style={{ color: categorySelected === item.id ? 'red': 'black' }}
            >
              {item.name}
            </List.Item>
          )}
        />
      </Col>
      <Col span={20}>
        <Row gutter={[8, 8]}>
          {renderProductList()}
        </Row>
        {productList.data.length % 4 === 0 && (
          <Button onClick={() => handleShowMore()}>Show more</Button>
        )}
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  const { categoryList, productList } = state.productReducer;
  return {
    categoryList,
    productList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
