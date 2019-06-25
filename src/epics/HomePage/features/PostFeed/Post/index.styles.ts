import styled from 'styled-components';

const imageURL = (props: any) => props.imgURL;

export const Wrapper = styled.div`
  position: relative;
  width: 240px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 3px rgba(0,0,0, .4);
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
`;

export const ImageSection = styled.div<{imgURL: string}>`
  position: relative;
  width: 100%;
  height: 130px;
  background-image: url(${imageURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  flex-direction: column;
`;

export const Title = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const Author = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
  padding: 0 10px;
  color: #7989A7;
`;

export const Description = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
`;
