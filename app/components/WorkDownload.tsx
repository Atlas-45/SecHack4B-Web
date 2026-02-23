interface WorkDownloadProps {
  id: string;
}

export default function WorkDownload({ id }: WorkDownloadProps) {
  return (
    <a href={`/api/download?id=${id}`} className="btn-outline" download>
      Download JPG
    </a>
  );
}
