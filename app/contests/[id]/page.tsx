import { ContestDetail } from "@/component/contests/ContestDetails";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ContestDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <>
      <ContestDetail id={Number(id)} />
    </>
  );
}