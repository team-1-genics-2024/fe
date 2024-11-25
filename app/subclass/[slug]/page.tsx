import SubClass from "@/app/subclass/[slug]/containers/SubClassPage";

export default function DetailSubClass({
  params,
}: {
  params: { slug: number };
}) {
  const { slug } = params;

  return (
    <div>
      <SubClass slug={slug} />
    </div>
  );
}
