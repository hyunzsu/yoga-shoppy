// 선택된 파일을 전달해주면 알아서 업로드, 업로드 된 url을 return
export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file); // 파일은 전달받은 파일을 넣을거고
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: data, // 방금 만든 FormData
  })
    .then((res) => res.json()) // res를 json으로 변환
    .then((data) => data.url); // data가 받아와지면 data의 url을 return
}
