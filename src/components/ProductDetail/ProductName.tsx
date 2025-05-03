interface ProductNameProps {
  name: string;
}
export function ProductName({ name }: ProductNameProps) {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl flex justify-center md:justify-start font-bold text-gray-900 mb-4">
          {name}
        </h1>
      </div>
    </div>
  );
}
