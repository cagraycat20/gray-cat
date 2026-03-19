import 'jest';
// import { productHelper as ph } from './product-helper';

describe('Product helper', () => {
    let initialApiUlr: string | undefined;

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();

        initialApiUlr = process.env.REACT_APP_API_URL;
        process.env.REACT_APP_API_URL = 'test';
    });

    afterEach(() => {
        process.env.REACT_APP_API_URL = initialApiUlr;
    });

    describe('Get main nutrient', () => {
        it('protein: 0, fat: 0, carbs: 0 => fat', () => {
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('fat');
        });

        it('protein: 1, fat: 0, carbs: 0 => protein', () => {
            const product = { id: 'id', name: 'name', protein: 1, fat: 0, carbs: 0, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('protein');
        });

        it('protein: 0, fat: 1, carbs: 0 => fat', () => {
            const product = { id: 'id', name: 'name', protein: 0, fat: 1, carbs: 0, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('fat');
        });

        it('protein: 0, fat: 0, carbs: 1 => carbs', () => {
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 1, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('carbs');
        });

        it('protein: 1, fat: 1, carbs: 0 => fat', () => {
            const product = { id: 'id', name: 'name', protein: 1, fat: 1, carbs: 0, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('fat');
        });

        it('protein: 1, fat: 0, carbs: 1 => protein', () => {
            const product = { id: 'id', name: 'name', protein: 1, fat: 0, carbs: 1, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('protein');
        });

        it('protein: 0, fat: 1, carbs: 1 => fat', () => {
            const product = { id: 'id', name: 'name', protein: 0, fat: 1, carbs: 1, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('fat');
        });

        it('protein: 1, fat: 1, carbs: 1 => fat', () => {
            const product = { id: 'id', name: 'name', protein: 0, fat: 1, carbs: 1, calories: 0 };
            const { productHelper } = require('./product-helper');

            expect(productHelper.getMainNutrient(product)).toBe('fat');
        });
    });

    describe('Calculate nutrients', () => {
        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=0', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 0)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=200', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 200)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=0', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 0)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=200', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 20.246, fat: 40.246, carbs: 60.246, calories: 80.246 };

            expect(productHelper.calculateNutrients(product, 200)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=0, round=false', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 0, false)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=200, round=false', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 200, false)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=0, round=false', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.calculateNutrients(product, 0, false)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=200, round=false', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 20.246, fat: 40.246, carbs: 60.246, calories: 80.246 };

            expect(productHelper.calculateNutrients(product, 200, false)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=0, round=true', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.calculateNutrients(product, 0, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, productWeight=200, round=true', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.calculateNutrients(product, 200, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=0, round=true', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.calculateNutrients(product, 0, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, productWeight=200, round=true', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 20.2, fat: 40.2, carbs: 60.2, calories: 80.2 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.calculateNutrients(product, 200, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });
    });

    describe('Nutrients per kilo', () => {
        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=0', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.nutrientsPerKilo(nutrients, 0)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=200', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.nutrientsPerKilo(nutrients, 200)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, bodyWeight=0', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 10.1, fat: 20.1, carbs: 30.1, calories: 40.1 };

            expect(productHelper.nutrientsPerKilo(nutrients, 0)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, bodyWeight=200', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0.1, fat: 0.1, carbs: 0.2, calories: 0.2 };

            expect(productHelper.nutrientsPerKilo(nutrients, 200)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=0, round=false', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.nutrientsPerKilo(nutrients, 0, false)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=200, round=false', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.nutrientsPerKilo(nutrients, 200, false)).toEqual(result);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, bodyWeight=0, round=false', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };

            expect(productHelper.nutrientsPerKilo(nutrients, 0, false)).toEqual(result);
        });

        it('{protein: 10.12, fat: 20.1, carbs: 30.123, calories: 40.123}, bodyWeight=200, round=false', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.12, fat: 20.1, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0.0506, fat: 0.1005, carbs: 0.150615, calories: 0.200615 };

            expect(productHelper.nutrientsPerKilo(nutrients, 200, false)).toEqual(result);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=0, round=true', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.nutrientsPerKilo(nutrients, 0, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 0, fat: 0, carbs: 0, calories: 0}, bodyWeight=200, round=true', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 0, fat: 0, carbs: 0, calories: 0 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.nutrientsPerKilo(nutrients, 200, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, bodyWeight=0, round=true', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.nutrientsPerKilo(nutrients, 0, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });

        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}, bodyWeight=200, round=true', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 20.2, fat: 40.2, carbs: 60.2, calories: 80.2 };

            productHelper.roundNutrients = jest.fn(() => result);

            expect(productHelper.nutrientsPerKilo(nutrients, 200, true)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
        });
    });

    describe('Calculate full nutrient data', () => {
        it('{protein: 10, fat: 20, carbs: 30, calories: 40}, productWeight=200, bodyWeight=300', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id', name: 'name', protein: 10, fat: 20, carbs: 30, calories: 40 };
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const nutrientsPerKilo = { protein: 10.12, fat: 20.12, carbs: 30.12, calories: 40.12 };
            const result = { nutrients, nutrientsPerKilo };

            productHelper.calculateNutrients = jest.fn(() => nutrients);
            productHelper.nutrientsPerKilo = jest.fn(() => nutrientsPerKilo);

            expect(productHelper.calculateFullNutrientData(product, 200, 300)).toEqual(result);
            expect(productHelper.calculateNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.nutrientsPerKilo).toHaveBeenCalledTimes(1);
        });
    });

    describe('Round nutrients', () => {
        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}', () => {
            const { mathUtils } = require('../shared/utils/math.utils');
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const result = { protein: 10.1, fat: 20.1, carbs: 30.1, calories: 40.1 };

            mathUtils.round = jest.fn()
                .mockReturnValueOnce(10.1)
                .mockReturnValueOnce(20.1)
                .mockReturnValueOnce(30.1)
                .mockReturnValueOnce(40.1);

            expect(productHelper.roundNutrients(nutrients)).toEqual(result);
            expect(mathUtils.round).toHaveBeenCalledTimes(4);
        });
    });

    describe('Add nutrients', () => {
        it('{protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123}', () => {
            const { productHelper } = require('./product-helper');
            const nutrients = { protein: 10.123, fat: 20.123, carbs: 30.123, calories: 40.123 };
            const product = { id: 'id', name: 'name', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const result = { protein: 60.123, fat: 80.123, carbs: 100.123, calories: 60.123 };

            productHelper.calculateNutrients = jest.fn(() => {
                return { protein: 50, fat: 60, carbs: 70, calories: 20 };
            });

            expect(productHelper.addToNutrients(nutrients, product, 200)).toEqual(result);
            expect(productHelper.calculateNutrients).toHaveBeenCalledTimes(1);
        });
    });

    describe('Add up nutrients', () => {
        it('Arrays of product weights and products are empty', () => {
            const { productHelper } = require('./product-helper');
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.addUpNutrients([], [])).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
        });

        it('Array of products is empty', () => {
            const { productHelper } = require('./product-helper');

            const productWeight1 = { productId: 'id1', productWeight: 10 };
            const productWeight2 = { productId: 'id2', productWeight: 20 };
            const productWeight3 = { productId: 'id3', productWeight: 30 };
            const productWeights = [ productWeight1, productWeight2, productWeight3 ];

            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.addUpNutrients(productWeights, [])).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
        });

        it('Array of product weights is empty', () => {
            const { productHelper } = require('./product-helper');

            const product1 = { id: 'id1', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id2', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id3', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.addUpNutrients([], products)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
        });

        it('Product not found', () => {
            const { productHelper } = require('./product-helper');

            const productWeight1 = { productId: 'id1', productWeight: 10 };
            const productWeight2 = { productId: 'id2', productWeight: 20 };
            const productWeight3 = { productId: 'id3', productWeight: 30 };
            const productWeights = [ productWeight1, productWeight2, productWeight3 ];

            const product1 = { id: 'id10', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id20', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id30', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.findProduct = jest.fn(() => undefined);

            expect(productHelper.addUpNutrients(productWeights, products)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.findProduct).toHaveBeenCalledTimes(3);
        });

        it('Product found', () => {
            const { productHelper } = require('./product-helper');

            const productWeight1 = { productId: 'id1', productWeight: 10 };
            const productWeight2 = { productId: 'id2', productWeight: 20 };
            const productWeight3 = { productId: 'id3', productWeight: 30 };
            const productWeights = [ productWeight1, productWeight2, productWeight3 ];

            const product1 = { id: 'id1', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id20', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id30', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            const result = { protein: 0.1, fat: 0.2, carbs: 0.3, calories: 0.4 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 0.1, fat: 0.2, carbs: 0.3, calories: 0.4 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.findProduct = jest.fn(() => undefined).mockReturnValueOnce(product1);

            productHelper.addNutrients = jest.fn(() => undefined)
                .mockReturnValueOnce({ protein: 0.1, fat: 0.2, carbs: 0.3, calories: 0.4 });

            expect(productHelper.addUpNutrients(productWeights, products)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.findProduct).toHaveBeenCalledTimes(3);
            expect(productHelper.addNutrients).toHaveBeenCalledTimes(1);
        });

        it('Products found', () => {
            const { productHelper } = require('./product-helper');

            const productWeight1 = { productId: 'id1', productWeight: 10 };
            const productWeight2 = { productId: 'id2', productWeight: 20 };
            const productWeight3 = { productId: 'id3', productWeight: 30 };
            const productWeights = [ productWeight1, productWeight2, productWeight3 ];

            const product1 = { id: 'id1', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id2', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id3', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            const result = { protein: 3.8, fat: 4.4, carbs: 5, calories: 5.6 };

            productHelper.roundNutrients = jest.fn(() => {
                return { protein: 3.8, fat: 4.4, carbs: 5, calories: 5.6 };
            });

            productHelper.createNutrients = jest.fn(() => {
                return { protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            productHelper.findProduct = jest.fn(() => undefined)
                .mockReturnValueOnce(product1)
                .mockReturnValueOnce(product2)
                .mockReturnValueOnce(product3);

            productHelper.addNutrients = jest.fn(() => undefined)
                .mockReturnValueOnce({ protein: 0.1, fat: 0.2, carbs: 0.3, calories: 0.4 })
                .mockReturnValueOnce({ protein: 1.1, fat: 1.4, carbs: 1.7, calories: 2 })
                .mockReturnValueOnce({ protein: 3.8, fat: 4.4, carbs: 5, calories: 5.6 });

            expect(productHelper.addUpNutrients(productWeights, products)).toEqual(result);
            expect(productHelper.roundNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.createNutrients).toHaveBeenCalledTimes(1);
            expect(productHelper.findProduct).toHaveBeenCalledTimes(3);
            expect(productHelper.addNutrients).toHaveBeenCalledTimes(3);
        });
    });

    describe('Find product', () => {
        it('Product not found', () => {
            const { productHelper } = require('./product-helper');

            const product1 = { id: 'id1', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id2', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id3', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            expect(productHelper.findProduct(products, 'id10')).toBe(undefined);
        });

        it('Product found', () => {
            const { productHelper } = require('./product-helper');

            const product1 = { id: 'id1', name: 'name1', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const product2 = { id: 'id2', name: 'name2', protein: 5, fat: 6, carbs: 7, calories: 8 };
            const product3 = { id: 'id3', name: 'name3', protein: 9, fat: 10, carbs: 11, calories: 12 };
            const products = [ product1, product2, product3 ];

            expect(productHelper.findProduct(products, 'id2')).toEqual(product2);
        });
    });

    describe('Create nutrients', () => {
        it('Default nutrients', () => {
            const { productHelper } = require('./product-helper');
            const result = { protein: 0, fat: 0, carbs: 0, calories: 0 };

            expect(productHelper.createNutrients()).toEqual(result);
        });
    });

    describe('Create product', () => {
        it('New product', () => {
            const { productHelper } = require('./product-helper');
            const result = { id: '1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };

            jest.mock('uuid/v4', () => () => '1');

            expect(productHelper.createProduct()).toEqual(result);
        });
    });

    describe('Clone product', () => {
        it('Cloned product', () => {
            const { productHelper } = require('./product-helper');
            const originalProduct = { id: 'id1', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const result = { id: 'id2', name: 'Test - New', protein: 1, fat: 2, carbs: 3, calories: 4 };

            productHelper.createProduct = jest.fn(() => {
                return { id: 'id2', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.cloneProduct(originalProduct)).toEqual(result);
            expect(productHelper.createProduct).toHaveBeenCalledTimes(1);
        });
    });

    describe('Format nutrient value', () => {
        it('10000', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(10000)).toBe('10K');
        });

        it('10000.567', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(10000.567)).toBe('10K');
        });

        it('1000', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(1000)).toBe(1000);
        });

        it('1000.567', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(1000.567)).toBe(1000);
        });

        it('999', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(999)).toBe(999);
        });

        it('999.567', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.formatNutrientValue(999.567)).toBe(999.6);
        });
    });

    describe('Merge product', () => {
        it('Product is undefined and empty partial product', () => {
            const { productHelper } = require('./product-helper');
            const result = { id: 'id1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };

            productHelper.createProduct = jest.fn(() => {
                return { id: 'id1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.mergeProduct(undefined, {})).toEqual(result);
            expect(productHelper.createProduct).toHaveBeenCalledTimes(1);
        });

        it('Product is undefined', () => {
            const { productHelper } = require('./product-helper');
            const partialProduct = { id: 'id2', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const result = { id: 'id2', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };

            productHelper.createProduct = jest.fn(() => {
                return { id: 'id1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.mergeProduct(undefined, partialProduct)).toEqual(result);
            expect(productHelper.createProduct).toHaveBeenCalledTimes(1);
        });

        it('Partial product is empty', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id2', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const result = { id: 'id2', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };

            productHelper.createProduct = jest.fn(() => {
                return { id: 'id1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.mergeProduct(product, {})).toEqual(result);
            expect(productHelper.createProduct).toHaveBeenCalledTimes(0);
        });

        it('Partial product is not empty', () => {
            const { productHelper } = require('./product-helper');
            const product = { id: 'id2', name: 'Test', protein: 1, fat: 2, carbs: 3, calories: 4 };
            const partialProduct = { id: 'id3', name: 'Test3', protein: 10, fat: 20, carbs: 30, calories: 40 };
            const result = { id: 'id3', name: 'Test3', protein: 10, fat: 20, carbs: 30, calories: 40 };

            productHelper.createProduct = jest.fn(() => {
                return { id: 'id1', name: '', protein: 0, fat: 0, carbs: 0, calories: 0 };
            });

            expect(productHelper.mergeProduct(product, partialProduct)).toEqual(result);
            expect(productHelper.createProduct).toHaveBeenCalledTimes(0);
        });
    });

    describe('Get product image', () => {
        it('Image=\'\', width=100, height=200', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('', 100, 200)).toBe(undefined);
        });

        it('Image=\'\', width=100, height=200, previewMode=true', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('', 100, 200, true)).toBe(undefined);
        });

        it('Image=\'test\', width=100, height=200', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('test', 100, 200))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJ0ZXN0IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDAsImhlaWdodCI6MjAwLCJmaXQiOiJvdXRzaWRlIn0sImZsYXR0ZW4iOnsiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6bnVsbH19fX0=');
        });

        it('Image=\'test\', width=100, height=200, previewMode=true', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('test', 100, 200, true))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJ0ZXN0IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMDAsImhlaWdodCI6MjAwLCJmaXQiOiJvdXRzaWRlIn0sImZsYXR0ZW4iOnsiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6bnVsbH19fX0=');
        });

        it('Image=\'httptest\', width=100, height=200', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('httptest', 100, 200))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJodHRwdGVzdCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAwLCJoZWlnaHQiOjIwMCwiZml0Ijoib3V0c2lkZSJ9LCJmbGF0dGVuIjp7ImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOm51bGx9fX19');
        });

        it('Image=\'httptest\', width=100, height=200, previewMode=true', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('httptest', 100, 200, true))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJodHRwdGVzdCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAwLCJoZWlnaHQiOjIwMCwiZml0Ijoib3V0c2lkZSJ9LCJmbGF0dGVuIjp7ImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOm51bGx9fX19');
        });

        it('Image=\'data:imagetest\', width=100, height=200', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('data:imagetest', 100, 200))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJkYXRhOmltYWdldGVzdCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAwLCJoZWlnaHQiOjIwMCwiZml0Ijoib3V0c2lkZSJ9LCJmbGF0dGVuIjp7ImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOm51bGx9fX19');
        });

        it('Image=\'data:imagetest\', width=100, height=200, previewMode=true', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductImage('data:imagetest', 100, 200, true))
                // tslint:disable-next-line: max-line-length
                .toBe('eyJrZXkiOiJkYXRhOmltYWdldGVzdCIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAwLCJoZWlnaHQiOjIwMCwiZml0Ijoib3V0c2lkZSJ9LCJmbGF0dGVuIjp7ImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOm51bGx9fX19');
        });
    });

    describe('Get image thumbnail', () => {
        it('Has thumbnail', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductThumbnail({thumb: 'encodedData'}))
              .toBe("url('data:image/png;base64,[object Object]')");
        });
        it('No thumbnail', () => {
            const { productHelper } = require('./product-helper');
            expect(productHelper.getProductThumbnail({})).toBe("url('data:image/png;base64,[object Object]')");
        });
    });

    // describe('Get nutrient price', () => {
    //     it('Edge values', () => {
    //         expect(ph.getNutrientPrice(100, {
    //             productWeight: 100,
    //             price: 100,
    //         })).toBe(1);

    //         expect(ph.getNutrientPrice(20, {
    //             productWeight: 100,
    //             price: 100,
    //         })).toBe(100 * 5);

    //         expect(ph.getNutrientPrice(0.1, {
    //             productWeight: 100,
    //             price: 100,
    //         })).toBe(0.001);
    //     });
    // });
});
