export default async function OrganizationIdPage({
    params,
}: {
    params: Promise<{ organizationId: string }>;
}) {
    const { organizationId } = await params;

    return (
        <>
            <h1>Organization ID: {organizationId}</h1>
        </>
    );
}
