import VerifyCustomer from '../../../../components/verify/VerifyCustomer'

export default async function VerifyPage({ params }: { params: { code: string } }) {
    const code = await Promise.resolve(params.code)
    return <VerifyCustomer code={code} />
}