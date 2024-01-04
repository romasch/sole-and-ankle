import React from 'react';
import styled from 'styled-components/macro';

import {COLORS, WEIGHTS} from '../../constants';
import {formatPrice, isNewShoe, pluralize} from '../../utils';
import Spacer from '../Spacer';

const TAGS = {
    'on-sale': {
        label: "Sale",
        color: COLORS.primary,
    },
    'new-release': {
        label: "Just Released!",
        color: COLORS.secondary,
    }
}

const ShoeCard = ({
                      slug,
                      name,
                      imageSrc,
                      price,
                      salePrice,
                      releaseDate,
                      numOfColors,
                  }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
        ? 'on-sale'
        : isNewShoe(releaseDate)
            ? 'new-release'
            : 'default'

    const tag = TAGS[variant];

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc}/>
                    {tag && <ImageTag style={{'--color': tag.color}}>{tag.label}</ImageTag>}
                </ImageWrapper>
                <Spacer size={12}/>
                <Row>
                    <Name>{name}</Name>
                    <Price strike={!!salePrice}>{formatPrice(price)}</Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                    <SalePrice>{salePrice && formatPrice(salePrice)}</SalePrice>
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;

`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const ImageTag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  padding: 4px 8px;
  border-radius: 2px;
  background-color: var(--color);

  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
`;

const Image = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${({strike}) => strike ? COLORS.gray["700"] : ""};
  text-decoration: ${({strike}) => strike ? 'line-through' : ""};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
