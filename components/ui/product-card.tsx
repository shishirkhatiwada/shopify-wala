'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ShopifyProduct } from '@/lib/shopify';
import Image from 'next/image';
import { Button } from './button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.edges[0]?.node.url;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.images.edges[0]?.node.altText || product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-lg font-bold">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
          }).format(price)}
        </span>
        <Button size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}