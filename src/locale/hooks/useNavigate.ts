import { useRouter } from '../navigation';

export function useNavigate() {
  const router = useRouter();

  // Hàm navigate nhận vào path và điều hướng đến đường dẫn đó
  const navigate = (path: string) => {
    router.push(path);
  };

  return navigate;
}
