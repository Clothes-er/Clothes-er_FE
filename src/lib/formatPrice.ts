export const formatPrice = (price: number | string): string => {
    if (typeof price === 'number') {
      return price.toLocaleString();
    }
    if (typeof price === 'string' && !isNaN(Number(price))) {
      return Number(price).toLocaleString();
    }
    return price;
  };
  
/* 숫자의 세 자리마다 콤마를 제거하는 함수 */
export  const removeCommas = (price: string): string => {
    return price.replace(/,/g, "");
  };