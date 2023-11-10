import { useDispatch, useSelector } from 'react-redux';
import {
    clearSelectedProduct,
    createProductAsync,
    fetchBrandsAsync,
    fetchCategoriesAsync,
    fetchProductByIdAsync,
    selectBrands,
    selectCategories,
    selectProductById,
    updateProductAsync,
} from '../../components/product/productSlice';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAxios } from '../../utils/axios';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
// import Modal from '../../common/Modal';
// import { useAlert } from 'react-alert';

function ProductForm() {
    // const {
    //     register,
    //     handleSubmit,
    //     setValue,
    //     reset,
    //     formState: { errors },
    // } = useForm();
    const brands = useSelector(selectBrands);
    const [cookies, setCookies] = useCookies(["adminToken"]);
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [product, setProduct] = useState({
        name: "",
        images: [],
        specification: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        Stocks: 0,
        featured: false,
        best_seller: false,

    })
    const [uploadProductImages, setUploadPropertyImages] = useState([]);
    const [filesToupload, setFilesToUpload] = useState([]);
    const [bodyData, setBodyData] = useState(new FormData());


    useEffect(() => {
        if (cookies && cookies.adminToken) {
            console.log(cookies.adminToken, "dslfjadslk")
            setToken(cookies.adminToken);
        }
    }, [cookies]);


    //   const params = useParams();
    //   const selectedProduct = useSelector(selectProductById);
    //   const [openModal, setOpenModal] = useState(null);
    //   const alert = useAlert();




    useEffect(() => {
        // dispatch(fetchBrandsAsync());
        dispatch(fetchCategoriesAsync());
        dispatch(fetchBrandsAsync());
        // dispatch(fetchBannerAsync())
        // dispatch(fetchAllProductsAsync())
    }, []);

    const colors = [
        {
            name: 'White',
            class: 'bg-white',
            selectedClass: 'ring-gray-400',
            id: 'white',
        },
        {
            name: 'Gray',
            class: 'bg-gray-200',
            selectedClass: 'ring-gray-400',
            id: 'gray',
        },
        {
            name: 'Black',
            class: 'bg-gray-900',
            selectedClass: 'ring-gray-900',
            id: 'black',
        },
    ];

    const sizes = [
        { name: 'XXS', inStock: true, id: 'xxs' },
        { name: 'XS', inStock: true, id: 'xs' },
        { name: 'S', inStock: true, id: 's' },
        { name: 'M', inStock: true, id: 'm' },
        { name: 'L', inStock: true, id: 'l' },
        { name: 'XL', inStock: true, id: 'xl' },
        { name: '2XL', inStock: true, id: '2xl' },
        { name: '3XL', inStock: true, id: '3xl' },
    ];

    //   useEffect(() => {
    //     if (params.id) {
    //       dispatch(fetchProductByIdAsync(params.id));
    //     } else {
    //       dispatch(clearSelectedProduct());
    //     }
    //   }, [params.id, dispatch]);

    //   useEffect(() => {
    //     if (selectedProduct && params.id) {
    //       setValue('title', selectedProduct.title);
    //       setValue('description', selectedProduct.description);
    //       setValue('price', selectedProduct.price);
    //       setValue('discountPercentage', selectedProduct.discountPercentage);
    //       setValue('thumbnail', selectedProduct.thumbnail);
    //       setValue('stock', selectedProduct.stock);
    //       setValue('image1', selectedProduct.images[0]);
    //       setValue('image2', selectedProduct.images[1]);
    //       setValue('image3', selectedProduct.images[2]);
    //       setValue('brand', selectedProduct.brand);
    //       setValue('category', selectedProduct.category);
    //       setValue('highlight1', selectedProduct.highlights[0]);
    //       setValue('highlight2', selectedProduct.highlights[1]);
    //       setValue('highlight3', selectedProduct.highlights[2]);
    //       setValue('highlight4', selectedProduct.highlights[3]);
    //       setValue(
    //         'sizes',
    //         selectedProduct.sizes.map((size) => size.id)
    //       );
    //       setValue(
    //         'colors',
    //         selectedProduct.colors.map((color) => color.id)
    //       );
    //     }
    //   }, [selectedProduct, params.id, setValue]);

    const handleDelete = () => {
        const product = { ...selectedProduct };
        product.deleted = true;
        dispatch(updateProductAsync(product));
    };


    // Image Upload FUnction

    useEffect(() => {
        console.log(filesToupload, "mainImage")
    }, [filesToupload])



    const handleImageChange = (e) => {
        if (e.target.files) {
            setFilesToUpload((prev) => {
                let prevs = [...filesToupload];
                console.log(e.target.files);
                prevs.push(e.target.files[0]);
                console.log(prevs);
                return prevs;
            });
        }
        e.target.files = null;
    };
    const dleteImage = (file) => {
        setFilesToUpload((prev) => {
            let imgs = [...filesToupload];
            const index = imgs.indexOf(file);
            if (index > -1) {
                imgs.splice(index, 1);
            }
            return imgs;
        });
    };

    const renderPhotos = (source) => {

        return source.map((photo, index) => {
            return (
                <div
                    className="w-max h-40 flex justify-center items-center  relative max-w-[200px]"
                    key={index}
                >
                    <button
                        onClick={() => {
                            dleteImage(photo);
                        }}
                        className="text-white bg-red-500 h-6 w-6 flex rounded-full items-center justify-center absolute top-1 right-0"
                    >
                        <AiOutlineClose />
                    </button>
                    <img
                        className=" h-full object-cover"
                        src={URL.createObjectURL(photo)}
                        alt=""
                        key={photo}
                    />
                </div>
            );
        });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(product, "sdfjsdhkjhfksfhd");
    //     var bodyFormData = new FormData();
    //     for (let i of filesToupload) {
    //         bodyFormData.append('images', i);
    //     }
    //     bodyFormData.append('name', product.name);
    //     bodyFormData.append('Stocks', product.Stocks);
    //     bodyFormData.append('category', product.category);
    //     bodyFormData.append('description', product.description);
    //     bodyFormData.append('price', product.price);
    //     bodyFormData.append('specification', product.specification);
    //     bodyFormData.append('featured', product.specification);
    //     bodyFormData.append('best_seller', product.specification);

    //     console.log(bodyFormData,"lkljk")

    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product, "sdfjsdhkjhfksfhd");

        let bodyFormData = new FormData();

        for (let i of filesToupload) {
            bodyFormData.append('images', i);
        }

        bodyFormData.append('name', product.name);
        console.log('After appending name:', bodyFormData);
        bodyFormData.append('Stocks', product.Stocks);
        bodyFormData.append('category', product.category);
        bodyFormData.append('description', product.description);
        bodyFormData.append('brand', product.brand);
        bodyFormData.append('price', product.price);
        bodyFormData.append('specification', product.specification);
        bodyFormData.append('featured', product.featured); // Fix here
        bodyFormData.append('best_seller', product.best_seller); // Fix here

        console.log(bodyFormData, "lkljk");

        const instance = useAxios(token)
        try {
            const response = await instance.post("admin/product/new", bodyFormData)
            console.log(bodyFormData, "lkljk");
            if (response.data.success) {
                toast("Product added successfull")
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form
                className='px-[300px]'
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="space-y-12 bg-white p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Add Product
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )} */}

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="text"
                                            value={product?.name}
                                            onChange={(e) => setProduct((prevProduct) => ({
                                                ...prevProduct, name: e.target.value
                                            }))}
                                            id="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        value={product?.description}
                                        onChange={(e) => setProduct((prevProduct) => ({
                                            ...prevProduct, description: e.target.value
                                        }))}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few sentences about product.
                                </p>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="specification"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Specification
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="specification"
                                        value={product?.specification}
                                        onChange={(e) => setProduct((prevProduct) => ({
                                            ...prevProduct, specification: e.target.value
                                        }))}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few specification of a product.
                                </p>
                            </div>


                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="text"
                                            value={product?.brand}
                                            onChange={(e) => setProduct((prevProduct) => ({
                                                ...prevProduct, brand: e.target.value
                                            }))}
                                            id="brand"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-span-full">
                                <label
                                    htmlFor="brand"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <select
                                        {...register('brand', {
                                            required: 'brand is required',
                                        })}
                                    >
                                        <option value="">--choose brand--</option>
                                        {brands.map((brand) => (
                                            <option key={brand.value} value={brand.value}>
                                                {brand.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}

                            {/* <div className="col-span-full">
                <label
                  htmlFor="colors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => (
                    <>
                      <input
                        type="checkbox"
                        {...register('colors', {})}
                        key={color.id}
                        value={color.id}
                      />{' '}
                      {color.name}
                    </>
                  ))}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => (
                    <>
                      <input
                        type="checkbox"
                        {...register('sizes', {})}
                        key={size.id}
                        value={size.id}
                      />{' '}
                      {size.name}
                    </>
                  ))}
                </div>
              </div> */}

                            <div className="col-span-full">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={(e) => setProduct((prevProduct) => ({
                                            ...prevProduct, category: e.target.value
                                        }))}
                                    >
                                        <option value="">--choose category--</option>
                                        {categories && categories?.allCategories?.length > 0 ? categories?.allCategories.map((category) => (
                                            <option className='text-black' value={category}>
                                                {category}
                                            </option>
                                        )) : ""}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="number"
                                            value={product?.price}
                                            onChange={(e) => setProduct((prevProduct) => ({
                                                ...prevProduct, price: e.target.value
                                            }))}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="sm:col-span-2">
                                <label
                                    htmlFor="discountPercentage"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Discount Percentage
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="number"
                                            {...register('discountPercentage', {
                                                required: 'discountPercentage is required',
                                                min: 0,
                                                max: 100,
                                            })}
                                            id="discountPercentage"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div> */}

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="stock"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Stocks
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                        <input
                                            type="number"
                                            onChange={(e) => setProduct((prevProduct) => ({
                                                ...prevProduct, Stocks: parseInt(e.target.value, 10),
                                            }))}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label>
                        Featured:
                        <input
                            type="checkbox"
                            checked={product.featured}
                            onChange={() =>
                                setProduct((prevProduct) => ({
                                    ...prevProduct,
                                    featured: !prevProduct.featured,
                                }))
                            }
                        />
                    </label>
                    <label>
                        Best Seller:
                        <input
                            type="checkbox"
                            checked={product.best_seller}
                            onChange={() =>
                                setProduct((prevProduct) => ({
                                    ...prevProduct,
                                    best_seller: !prevProduct.best_seller,
                                }))
                            }
                        />
                    </label>
                </div>
                <div>
                    <p className='text-center text-xl my-8 '>Add Images</p>

                    <div className="m-4">
                        {/* <label className="inline-block mb-2 text-gray-500">
                            Select Product Images (for Multiple images please upload one after one)
                        </label> */}
                        <div className="flex items-center  w-full">
                            <div className="w-full flex max-w-md overflow-x-scroll">
                                {renderPhotos(filesToupload)}
                            </div>
                            <label className=" max-w-[150px] flex flex-col w-full h-40 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Select a photo
                                    </p>
                                </div>
                                <input
                                    onChange={handleImageChange}
                                    type="file"
                                    className="opacity-0"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {/* <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button> */}

                    {/* {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )} */}

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add
                    </button>
                </div>
            </form>
            {/* {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )} */}
        </>
    );
}

export default ProductForm;
