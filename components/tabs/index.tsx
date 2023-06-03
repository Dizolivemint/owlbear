import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode[];
  activeTabIndex?: number;
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  border-top: 3px solid #1d222c;
  border-bottom: 3px solid #1d222c;
`;

const TabButtonsContainer = styled.div`
  display: flex;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  background: ${({ isActive }) => (isActive ? '#ccc' : 'none')};
  color: ${({ isActive }) => (isActive ? '#000' : '#fff')};
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const TabContent = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;

const Tab: React.FC<TabProps> = ({ title, children }) => {
  return <div title={title}>{children}</div>;
};

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const { children, activeTabIndex: initialActiveTabIndex = 0 } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(initialActiveTabIndex);

  useEffect(() => {
    setActiveTabIndex(initialActiveTabIndex);
  }, [initialActiveTabIndex]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <TabContainer>
      <TabButtonsContainer>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<TabProps>(child)) {
            return (
              <TabButton
                isActive={activeTabIndex === index}
                onClick={() => handleTabClick(index)}
              >
                {child.props.title}
              </TabButton>
            );
          }
          return null;
        })}
      </TabButtonsContainer>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<TabProps>(child) && activeTabIndex === index) {
          return (
            <TabContent isActive={activeTabIndex === index}>
              {child.props.children}
            </TabContent>
          );
        }
        return null;
      })}
    </TabContainer>
  );
};

export { Tabs, Tab };