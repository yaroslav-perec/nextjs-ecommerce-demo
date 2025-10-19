export type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];

	sku?: string;
	weight?: number;
	tags?: string[];
	warrantyInformation?: string;
	shippingInformation?: string;
	availabilityStatus?: string;
	returnPolicy?: string;
	minimumOrderQuantity?: number;

	dimensions?: {
		width: number;
		height: number;
		depth: number;
	};

	reviews?: Array<{
		rating: number;
		comment: string;
		date: string;
		reviewerName: string;
		reviewerEmail: string;
	}>;

	meta?: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
};

/** Response shape for the /products endpoint */
export type ProductsResponse = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};
