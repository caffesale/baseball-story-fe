import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

interface CommonCarouselProps<T> {
    data: T[];
    renderItem: ({
        item,
        index,
    }: {
        item: T;
        index: number;
    }) => React.ReactElement;
    onSnapToItem?: (index: number) => void;
    showPagination?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    loop?: boolean;
    itemWidth?: number;
    sliderWidth?: number;
    enableMomentum?: boolean;
    lockScrollWhileSnapping?: boolean;
    paginationStyle?: "default" | "minimal" | "custom";
    containerStyle?: object;
}

const CommonCarousel = <T,>({
    data,
    renderItem,
    onSnapToItem,
    showPagination = true,
    autoplay = false,
    autoplayDelay = 3000,
    autoplayInterval = 5000,
    loop = true,
    itemWidth,
    sliderWidth,
    enableMomentum = false,
    lockScrollWhileSnapping = true,
    paginationStyle = "default",
    containerStyle = {},
}: CommonCarouselProps<T>) => {
    const { width: screenWidth } = Dimensions.get("window");
    const carouselRef = useRef<Carousel<T>>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    // 기본값 설정
    const finalSliderWidth = sliderWidth || screenWidth;
    const finalItemWidth = itemWidth || screenWidth - 60;

    const handleSnapToItem = (index: number) => {
        setActiveSlide(index);
        onSnapToItem?.(index);
    };

    const getPaginationStyle = () => {
        switch (paginationStyle) {
            case "minimal":
                return {
                    containerStyle: styles.minimalPaginationContainer,
                    dotStyle: styles.minimalPaginationDot,
                    inactiveDotStyle: styles.minimalPaginationInactiveDot,
                };
            case "custom":
                return {
                    containerStyle: styles.customPaginationContainer,
                    dotStyle: styles.customPaginationDot,
                    inactiveDotStyle: styles.customPaginationInactiveDot,
                };
            default:
                return {
                    containerStyle: styles.defaultPaginationContainer,
                    dotStyle: styles.defaultPaginationDot,
                    inactiveDotStyle: styles.defaultPaginationInactiveDot,
                };
        }
    };

    const paginationProps = getPaginationStyle();

    return (
        <View style={[styles.container, containerStyle]}>
            <Carousel
                ref={carouselRef}
                data={data}
                renderItem={renderItem}
                sliderWidth={finalSliderWidth}
                itemWidth={finalItemWidth}
                onSnapToItem={handleSnapToItem}
                loop={loop}
                autoplay={autoplay}
                autoplayDelay={autoplayDelay}
                autoplayInterval={autoplayInterval}
                enableMomentum={enableMomentum}
                lockScrollWhileSnapping={lockScrollWhileSnapping}
                removeClippedSubviews={false} // iOS 이미지 깜빡임 방지
            />

            {showPagination && data.length > 1 && (
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={activeSlide}
                    containerStyle={paginationProps.containerStyle}
                    dotStyle={paginationProps.dotStyle}
                    inactiveDotStyle={paginationProps.inactiveDotStyle}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    dotContainerStyle={styles.dotContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dotContainer: {
        marginHorizontal: 3,
    },
    // Default 스타일
    defaultPaginationContainer: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    defaultPaginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#1976D2",
    },
    defaultPaginationInactiveDot: {
        backgroundColor: "#C4C4C4",
    },
    // Minimal 스타일
    minimalPaginationContainer: {
        paddingTop: 15,
        paddingBottom: 5,
    },
    minimalPaginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#333",
    },
    minimalPaginationInactiveDot: {
        backgroundColor: "#ddd",
    },
    // Custom 스타일
    customPaginationContainer: {
        paddingTop: 25,
        paddingBottom: 15,
    },
    customPaginationDot: {
        width: 12,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#FF5722",
    },
    customPaginationInactiveDot: {
        backgroundColor: "#FFCCBC",
    },
});

export default CommonCarousel;
