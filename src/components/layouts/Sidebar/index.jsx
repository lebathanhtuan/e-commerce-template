import history from '../../../utils/history';

import * as Style from './styles';

function Sidebar({ location }) {
  const SIDEBAR_ITEMS = [
    {
      path: '/admin/dashboard',
      title: 'Dashboard'
    },
    {
      path: '/admin/products',
      title: 'Product manage'
    },
  ];

  function renderSidebarItems() {
    return SIDEBAR_ITEMS.map((sidebarItem, sidebarIndex) => {
      return (
        <Style.SidebarItem
          key={sidebarIndex}
          onClick={() => history.push(sidebarItem.path)}
          active={sidebarItem.path === location.pathname}
        >
          {sidebarItem.title}
        </Style.SidebarItem>
      )
    })
  }

  return (
    <Style.SidebarContainer>
      {renderSidebarItems()}
    </Style.SidebarContainer>
  );
}

export default Sidebar;
