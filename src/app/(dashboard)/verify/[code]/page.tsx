import VerifyCustomer from '../../../../components/verify/VerifyCustomer'



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function VerifyPage({ params }: any) {
    return <VerifyCustomer code={params.code} />
}

export async function generateStaticParams() {
    return []
}