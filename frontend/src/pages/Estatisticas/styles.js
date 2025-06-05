import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: var(--text-color);
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  
  h1 {
    font-size: 32px;
    color: var(--text-color);
    margin: 0;
    text-align: center;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    h1 {
      margin-bottom: 15px;
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 10px;
  }
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#4caf50' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background: ${props => props.active ? '#43a047' : '#f5f5f5'};
  }
`;

export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const StatCardHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatCardContent = styled.div`
  padding: 20px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

export const CardValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export const InfoCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: var(--secondary-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
`;

export const InfoCardTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--accent-blue);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoCardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 5px;
`;

export const InfoCardLabel = styled.div`
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 10px;
`;

export const InfoCardTrend = styled.div`
  font-size: 14px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  ${props => props.positive ? css`
    color: var(--dot-color-3);
  ` : css`
    color: var(--dot-color-1);
  `}
`;
