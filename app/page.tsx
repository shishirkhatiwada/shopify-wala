'use client';

import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { getProducts, ShopifyProduct } from '@/lib/shopify';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  async function loadProducts(cursor?: string) {
    try {
      const response = await getProducts(10, cursor);
      const newProducts = response.products.edges.map((edge) => edge.node);
      
      if (cursor) {
        setProducts((prev) => [...prev, ...newProducts]);
        setLoadingMore(false);
      } else {
        setProducts(newProducts);
        setLoading(false);
      }
      
      setHasMore(response.products.pageInfo.hasNextPage);
      setEndCursor(response.products.pageInfo.endCursor);
    } catch (error) {
      console.error('Failed to load products:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadProducts(endCursor || undefined);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={loadMore}
            disabled={loadingMore}
            className="min-w-[200px]"
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}