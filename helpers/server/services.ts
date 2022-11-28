import axios from "axios";
import { HOME_PAGE, FEATURED_PRODUCTS, BRANDS, REGIDTERASINDIVIDUAL, LOGIN, LOGOUT, USERINFO, COUNTRIES, STATES, CITIES, PRODUCTS, ADDTOCART, UPDATECART, GETCARTITEMS, DELETECART, ADDADDRESS, GETADDRESS, PROMOTIONS, DETAILS, SIMILARPRODUCTS, ABOUTUS, REGISTERASSTORE, CREATEORDER, UPDATEUSER,COMPLETEPAYORDER,PAYMENTPROVIDOR,PAYORDER } from "./APIs";
const getConfig = (token?: string | null) => {
	return {
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*',
			'X-Requested-With': 'XMLHttpRequest',
			Authorization: `Bearer ${token || null}`,
			"company-id": 1,
			'branch-id': "1"
		},
	};
};
const getHomePageData = async () => {
	try {
		const res = await axios.get(`${HOME_PAGE}`, getConfig());
		return res.data;
	} catch (error: any) {
		console.log(error.response);
		return null;
	}
};

interface FeaturedParams  {
	categoryId?:number
	token?:string
}

const getFeaturedProducts = async (params:FeaturedParams) => {
	try {
		const res = await axios.get(`${FEATURED_PRODUCTS}?is_featured=1`,{
			headers: {
				"branch-id": "1",
				"company-id": 1,
				Authorization: `Bearer ${params.token}`
			},
			params: {
				category: params.categoryId,
			}
		});
		return res.data;
	} catch (error: any) {
		console.log(error.response);
		return null;
	}
};

const getBrands = async () => {
	try {
		const res = await axios.get(`${BRANDS}`, getConfig());
		return res.data;
	} catch (error: any) {
		console.log(error.response);
		return null;
	}
};


const handelRegister = async (first_name: string, last_name: string, email: string, password: string, phone_code: string, phone_number: number, token?: string | null) => {
	try {
		const res = await axios.post(`${REGIDTERASINDIVIDUAL}`, {
			first_name: first_name,
			last_name: last_name,
			email: email,
			phone_code: phone_code,
			phone_number: phone_number,
			password: password,
		}, getConfig(token))
		return res.data
	} catch (error: any) {
		console.log(error);
		if (error.response.status == 400) {
			return error.response.status
		} else {
			return null
		}
	}
}


const handelLogin = async (password: string, email: string, token?: string | null) => {
	try {
		const res = await axios.post(`${LOGIN}`, {
			email: email,
			password: password
		}, getConfig(token))
		return res.data
	} catch (error: any) {
		console.log(error);
		return error
	}
}


const handelLogout = async (token: string) => {
	try {
		const res = await axios.post(`${LOGOUT}`, {}, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getUser = async (token: string) => {
	try {
		const res = await axios.get(`${USERINFO}`, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getCountries = async () => {
	try {
		const res = await axios.get(`${COUNTRIES}`)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getStateOfCountry = async (id: number) => {
	try {
		const res = await axios.get(`${STATES}/${id}`)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}


const getCitesOfState = async (id: number) => {
	try {
		const res = await axios.get(`${CITIES}/${id}`)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

interface Params {
	token?: string,
	categoryId?: number | number[]
	product_name?: string
	Brands?: number[]
	page?: number
}

const getProducts = async (params: Params) => {
	try {
		const res = await axios.get(`${PRODUCTS}?page_size=20&OrderByNewest`, {
			headers: {
				"branch-id": "1",
				"company-id": 1,
				Authorization: `Bearer ${params.token}`
			},
			params: {
				category: params.categoryId,
				text: params.product_name,
				Brand: params.Brands,
				page: params.page
			}
		});
		return res.data;
	} catch (error: any) {
		console.log(error.response);
		return null;
	}
};

const addToCart = async (token: string, type: number, product_id: number, variation_id: number, company_id: number, branch_id: number, quantity: number) => {
	try {
		const res = await axios.post(`${ADDTOCART}`, {
			type: type,
			product_id: product_id,
			variation_id: variation_id,
			company_id: company_id,
			branch_id: branch_id,
			quantity: quantity,
			modifierGroup: [],
		}, getConfig(token)
		)
		return res.data
	} catch (error: any) {
		console.log(error)
		if (error?.response.status == 400) {
			return error?.response.status
		} else {
			return null
		}
	}
}

const updateCart = async (token: string, id: number, quantity: number) => {
	try {
		const res = await axios.put(`${UPDATECART}/${id}`, {
			quantity: quantity,
		}, getConfig(token)
		)
		return res.data
	} catch (error: any) {
		console.log(error)
		if (error?.response.status == 400) {
			return error?.response.status
		} else {
			return null
		}
	}
}

const getCartItems = async (token: string) => {
	try {
		const res = await axios.get(`${GETCARTITEMS}`, getConfig(token)
		)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const deleteCart = async (token: string, id: number) => {
	try {
		const res = await axios.delete(`${DELETECART}/${id}`, getConfig(token)
		)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const handelAddAress = async (name: string, address: string, country_id: string, state_id: number, city_id: number, city_name: string, post_code: number, build_number: number, token: string) => {
	try {
		const res = await axios.post(`${ADDADDRESS}`, {
			name: name,
			address: address,
			country_id: country_id,
			state_id: state_id,
			city_id: city_id,
			city_name: city_name,
			post_code: `${post_code}`,
			build_number: `${build_number}`,
		}, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getAddress = async (token: string) => {
	try {
		const res = await axios.get(`${GETADDRESS}`, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const handelUpdateAddress = async (id: number | string, name: string, address: string, country_id: string, state_id: number, city_id: number, city_name: string, post_code: number, build_number: number, token: string) => {
	try {
		const res = await axios.put(`${ADDADDRESS}/${id}`, {
			name: name,
			address: address,
			country_id: country_id,
			state_id: state_id,
			city_id: city_id,
			city_name: city_name,
			post_code: `${post_code}`,
			build_number: `${build_number}`,
		}, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const deleteAddress = async (token: string, id: number | string) => {
	try {
		const res = await axios.delete(`${ADDADDRESS}/${id}`, getConfig(token))
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getPromotions = async () => {
	try {
		const res = await axios.get(`${PROMOTIONS}`, {
			headers: {
				"branch-id": 1,
				"company-id": 1,
			},
		})
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}


interface PromotionsParams {
	token?: string,
	promotion?: number
	page?: number
}

const getPromotionsProducts = async (params: PromotionsParams) => {
	try {
		const res = await axios.get(`${PRODUCTS}?OrderByNewest&page_size=25&${params.promotion && params.promotion > 0 && `promotion=${params.promotion}`}`, {
			headers: {
				"branch-id": 1,
				"company-id": 1,
				Authorization: `Bearer ${params.token}`
			},
			params: {
				page: params.page,
			}
		})
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}


const getProductDetails = async (id: number) => {
	try {
		const res = await axios.get(`${DETAILS}/${id}`, {
			headers: {
				'branch-id': 1,
				"company-id": 1,
			}
		})
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}


const getSimilarProducts = async (id: number) => {
	try {
		const res = await axios.get(`${SIMILARPRODUCTS}/${id}/similar`, {
			headers: {
				'branch-id': 1,
				'company-id': 1
			}
		})
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getAbouUsInfo = async () => {
	try {
		const res = await axios.get(`${ABOUTUS}`)
		return res.data
	} catch (error) {
		console.log(error)
		return null
	}
}

const handelRegisterAsStore = async (first_name: string, last_name: string, email: string, password: string, phone_code: string, phone_number: number, tax_id: string, tax_id_doc: string, token?: string | null) => {
	try {
		const res = await axios.post(`${REGISTERASSTORE}`, {
			first_name: first_name,
			last_name: last_name,
			email: email,
			phone_code: phone_code,
			phone_number: phone_number,
			password: password,
			tax_id: tax_id,
			tax_id_document: tax_id_doc
		}, getConfig(token))
		return res.data
	} catch (error: any) {
		console.log(error);
		if (error.response.status == 400) {
			return error.response.status
		} else {
			return null
		}
	}
}


interface ORDERParams {
    token: string,
    shipping_method: string,
    address_id?: number
}



const handelCrateOrder = async (params: ORDERParams) => {
    try {
        const res = await axios.post(`${CREATEORDER}`, {
            description: "hello",
            branch_id: 1,
            shipping_method: params.shipping_method,
            address_id: params.address_id
        }, getConfig(params.token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


const getOrderById = async (token:string,id:number) => {
    try {
        const res = await axios.get(`${CREATEORDER}/${id}`,getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const getOrders = async (token:string) => {
    try {
        const res = await axios.get(`${CREATEORDER}?branch=1`,  getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

interface updateUSerParams {
	token: string,
    firstName:string,
    lastName:string,
	email:string
}

const handelUpdateUserInfo = async (params: updateUSerParams) => {
    try {
        const res = await axios.post(`${UPDATEUSER}`,{
                first_name: params.firstName,
                last_name: params.lastName,
				email:params.email
        }, getConfig(params.token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


const pay =process.env.NEXT_PUBLIC_PUBLISH_KEY

const getPaymentProvidor = async () => {
    try {
        const res = await axios.get(`${PAYMENTPROVIDOR}`,{
            headers:{
                "D-PAYMENT-AUTHORIZATION":`${pay}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


const handelOrderPay = async (token:string,order_id: number, payment_provider_id: number) => {
    try {
        const res = await axios.post(`${PAYORDER}`, {
            order_id: order_id,
            payment_provider_id: payment_provider_id
        },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const handelComletePay = async (token:string,payment_transaction_id: number) => {
    try {
        const res = await axios.post(`${COMPLETEPAYORDER}`, {
            payment_transaction_id:payment_transaction_id
        },getConfig(token))
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}


export { getHomePageData, getFeaturedProducts, getBrands, handelRegister, handelLogin, handelLogout, getUser, getCountries, getStateOfCountry, getCitesOfState, getProducts, addToCart, updateCart, getCartItems, deleteCart, handelAddAress, getAddress, handelUpdateAddress, deleteAddress, getPromotions, getPromotionsProducts, getProductDetails, getSimilarProducts, getAbouUsInfo, handelRegisterAsStore,handelCrateOrder,getOrderById,getOrders,handelUpdateUserInfo,getPaymentProvidor,handelOrderPay,handelComletePay };