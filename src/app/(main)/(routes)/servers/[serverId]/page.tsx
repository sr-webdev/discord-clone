const ServerPage = async ({ params }: { params: { serverId: string } }) => {
  const { serverId } = await params;

  return <div>Server {serverId}</div>;
};

export default ServerPage;
