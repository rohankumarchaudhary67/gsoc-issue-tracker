import OrganizationId from "@/components/dashboard/organizations/organizationId";

export default async function OrganizationIdPage({
    params,
}: {
    params: Promise<{ organizationId: string }>;
}) {
    const { organizationId } = await params;

    return (
        <>
            <OrganizationId organizationId={organizationId} />
        </>
    );
}
