import {Button, Link, Pagination, Spinner, useDisclosure} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
import {ChevronRight, Search} from "lucide-react";
import {Checkbox, CheckboxGroup} from "@nextui-org/checkbox";
import {SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import React, {useEffect, useState} from "react";
import {useAsyncList} from "@react-stately/data";
import {Modal, ModalContent} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import Fuse from "fuse.js";
import {
  getProductFilterCategories,
  getProductFilterStatus,
  ProductsFilter,
  ProductsFilterBadges
} from "component@/products/ProductsFilter.tsx";
import {Container, ContainerHeader, ContainerHeaderButton, ContainerHeaderTitle} from "component@/layout/Container.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {fetchProducts} from "@/features/product-slice.ts";

export function Products() {

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products); // select store

  // dispatch products
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  // refresh table list after load products
  useEffect(() => {
    if (products.length > 0 && !loading) {
      list.reload();
    }
  }, [products, loading]);

  // filtered products by category and status
  const filterProducts = (items: Product[]) => {
    return items.filter((item: Product) => {
      const categoryMatch = categoryCheckbox.length === 0 || categoryCheckbox.some(category => item.categories.includes(category));
      const statusMatch = statusCheckbox.length === 0 || statusCheckbox.includes(item.status);
      return categoryMatch && statusMatch;
    });
  };

  const fuseOptions = { keys: ['name', 'id'], includeScore: true }; // config Fuse package
  const [page, setPage] = React.useState(1); // default page for pagination
  const [categoryCheckbox, setCategoryCheckbox] = React.useState<string[]>([]); // selected categories in the filter
  const [statusCheckbox, setStatusCheckbox] = React.useState<string[]>([]); // selected status in the filter
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); // open modal filter (mobile)
  const [searchInput, setSearchInput] = useState(''); // search input

  // searching products
  const searchProduct = (products: Product[], query: string) => {
    if (!query) return products;
    const fuse = new Fuse(products, fuseOptions);
    const results = fuse.search(query);
    return results.map(result => result.item);
  };

  const rowsPerPage = 5; // Max count for products on one page
  const start = (page - 1) * rowsPerPage; // Start in slice
  const end = start + rowsPerPage; // End in slice
  const pages = Math.ceil(searchProduct(filterProducts(products), searchInput).length / rowsPerPage); // total count pages

  const list = useAsyncList({
    async load() {
      return { items: products };
    },
    async sort({items, sortDescriptor}: { items: Product[], sortDescriptor: SortDescriptor }) {
      if (!sortDescriptor.column) {
        return { items };
      }
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof Product];
          const second = b[sortDescriptor.column as keyof Product];
          const firstString = String(first);
          const secondString = String(second);

          let cmp = (parseInt(firstString) || firstString) < (parseInt(secondString) || secondString) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const FilterPanel = ({ className } : { className?: string }) => (
    <ProductsFilter className={className}>
      <CheckboxGroup
        defaultValue={categoryCheckbox}
        onValueChange={(value) => {
          setPage(1)
          setCategoryCheckbox(value)
        }}
        label="Categories"
      >
        {getProductFilterCategories(products).map((category, key) => (
          <Checkbox
            key={key}
            value={String(category)}
          >
            {String(category)}
          </Checkbox>
        ))}
      </CheckboxGroup>
      <CheckboxGroup
        defaultValue={statusCheckbox}
        onValueChange={(value) => {
          setPage(1)
          setStatusCheckbox(value)
        }}
        label="Status"
      >
        {getProductFilterStatus(products).map((status, key) => (
          <Checkbox
            key={key}
            value={String(status)}
          >
            {String(status)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </ProductsFilter>
  )

  return (
    <Container>
      <ContainerHeader>
        <ContainerHeaderTitle>Catalog</ContainerHeaderTitle>
        <ContainerHeaderButton>
          <Button
            color="primary"
            size="sm"
            onPress={onOpen}
            className="lg:hidden"
          >
            Show Filter
          </Button>
        </ContainerHeaderButton>
      </ContainerHeader>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-y-4">
            <Input
              placeholder="Search product"
              size="lg"
              startContent={<Search className="text-default-400 pointer-events-none flex-shrink-0 left-2 w-5 h-5"/>}
              value={searchInput}
              onValueChange={(value) => {
                setPage(1)
                setSearchInput(value)
              }}
            />
            <ProductsFilterBadges
              searchInput={searchInput}
              status={statusCheckbox}
              categories={categoryCheckbox}
            />
            <Table
              aria-label="products data table"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
            >
              <TableHeader>
                <TableColumn key="name" className="uppercase" allowsSorting>Name</TableColumn>
                <TableColumn key="status" className="hidden md:table-cell text-end uppercase">Status</TableColumn>
                <TableColumn key="total_sales" className="text-center uppercase" allowsSorting>Total Sales</TableColumn>
                <TableColumn key="actions" className="text-end"><span className="sr-only">Actions</span></TableColumn>
              </TableHeader>
              <TableBody
                items={searchProduct(filterProducts(list.items), searchInput).slice(start, end)}
                isLoading={loading}
                loadingContent={<Spinner/>}
                emptyContent={<div>No product found</div>}
              >
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-full">
                      <div className="flex items-center gap-x-4">
                        <div className="hidden md:block aspect-square w-[40px] h-[40px] md:w-[75px] md:h-[75px]">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="aspect-square object-cover rounded-md w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="md:text-xl font-medium line-clamp-2">
                            {item.name}
                          </div>
                          <div className="hidden md:block text-xs opacity-50 lg:line-clamp-2">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-end">
                      <Chip className="text-xs">{item.status}</Chip>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {item.total_sales}
                    </TableCell>
                    <TableCell className="text-end">
                      <Button as={Link} variant="flat" size="sm" color="primary" href={`/products/${item.id}`} className="min-w-8 px-0 md:min-w-16 font-bold">
                        <ChevronRight className="w-5 h-5 md:sr-only"/>
                        <span className="sr-only md:not-sr-only">Show</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <FilterPanel className="hidden lg:block"/>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          <FilterPanel/>
        </ModalContent>
      </Modal>
    </Container>
  )
}