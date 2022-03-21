const initialState = {
  products: [],
  cupcakes: [],
};

function reducerProducts(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM_FROM_LIST":
      let indexAdd = state.products.findIndex(
        (element) => element.id === action.value.id
      );
      if (indexAdd === -1) {
        return {
          ...state,
          products: [
            ...state.products,
            {
              id: action.value.id,
              cake: action.value.cake,
              amount: action.value.amount,
            },
          ],
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products.slice(0, indexAdd),
            {
              ...state.products[indexAdd],
              amount: parseInt(
                state.products[indexAdd].amount + action.value.amount
              ),
            },
            ...state.products.slice(indexAdd + 1),
          ],
        };
      }
    case "DELETE_ITEM_FROM_LIST":
      let indexDelete = state.products.findIndex(
        (element) => element.id === action.value.id
      );
      if (indexDelete === -1) {
        indexDelete = state.cupcakes.findIndex(
          (element) => element.id === action.value.id
        );
        if (indexDelete === -1) {
          return state;
        } else {
          return {
            ...state,
            cupcakes: state.cupcakes.filter(
              (value) => value.id !== action.value.id
            ),
          };
        }
      } else {
        return {
          ...state,
          products: state.products.filter(
            (value) => value.id !== action.value.id
          ),
        };
      }
    case "ADD_ITEM_CUPCAKE":
      let indexAddCupcake = state.cupcakes.findIndex(
        (element) => element.id === action.value.id
      );
      if (indexAddCupcake === -1) {
        return {
          ...state,
          cupcakes: [
            ...state.cupcakes,
            {
              id: action.value.id,
              params: action.value.params,
              amount: action.value.amount,
            },
          ],
        };
      } else {
        return {
          ...state,
          cupcakes: [
            ...state.cupcakes.slice(0, indexAddCupcake),
            {
              ...state.cupcakes[indexAddCupcake],
              amount: parseInt(
                state.cupcakes[indexAddCupcake].amount + action.value.amount
              ),
            },
            ...state.cupcakes.slice(indexAddCupcake + 1),
          ],
        };
      }
    case "DELETE_ALL":
      return {
        products: [],
        cupcakes: [],
      };
    default:
      return state;
  }
}

export { reducerProducts };
