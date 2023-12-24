/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useContext } from 'react'
import { Upload, Button, Modal, Image } from 'antd'
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useSetState } from 'react-use'
import { getBase64 } from './GetBase64'
import { ProductContext } from 'context/product.context'
// import type { RcFile } from 'antd/es/upload'

// interface UploadProps {
//   value?: any
//   onChange?: (values: any) => void
//   description?: string
//   type?: string
//   disabled?: boolean
//   multiple?: boolean
//   accept?: any
// }

export default function CustomUpload({
  value,
  onChange,
  description = '',
  type = 'image', //image, file
  //disabled = false,
  multiple = true,
  accept = '.png, .jpg, .jpeg, .jfif',
}) {
  const [preview, setPreview] = useSetState({ visible: false, image: '' })
  const [loading, setLoading] = useState(false)
  const uploading = useRef(false)
  const uploadRef = useRef(null)
  const {uploadImage, uploadImageFiles} = useContext(ProductContext)
  const getFileList = () => {
  
    if (!value) {
      return []
    }

    const fileList = Array.isArray(value)
    ? value?.filter((file) => file !== undefined).map((file) => ({ uid: file, name: file, url: file }))
    : [{ uid: value, name: value, url: value }];



  return fileList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }



  const handleUpload = (_, fileList) => {
    if (uploading.current) {
      return
    }

    uploading.current = true

    setLoading(true)
    return new Promise((resolve, reject) => {
   
      Promise.all(
        fileList?.map(async (file) => {
          const action = uploadImage
          console.log("ac", file);
          return action(file)
            .then((data) => {
              console.log("daya", data?.metadata.image_url);
              return data?.metadata.image_url
            })
            .catch((err) => {
                console.log("loois");
              reject(err)
            })
            .finally(() => setLoading(false))
        }),
      ).then((files) => {
        if (files?.[0]) {
          const newValues = multiple ? [...(value || []), ...files] : files?.[0]
   
          onChange && onChange(newValues)
          uploading.current = false
          resolve(newValues)
        }
      })
    })
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
    console.log("file", file);

      file.preview = await getBase64(file.originFileObj)
    }

    if (type === 'image') {
      setPreview({ visible: true, image: file.url || file.preview })
      return
    }

    return window.open(file.url, '_blank', 'noopener,noreferrer')
  }

  const handleRemove = (file) => {
    const newValues = multiple
      ? value.filter((url) => url != file?.url)
      : null
    console.log("valus", newValues);

    onChange && onChange(newValues)
  
  }

  const UploadButton = () => {
    return <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  }
//   console.log("sa", getFileList());
  return (
    <>
      <Upload
        fileList={getFileList()}
        listType={type === 'image' ? 'picture-card' : 'text'}
        beforeUpload={handleUpload}
        onPreview={handlePreview}
        multiple={multiple}
        onRemove={(file) => handleRemove(file)}
        {...(accept && { accept })}
      >
        {type === 'image' ? (
          multiple ? (
            <UploadButton />
          ) : getFileList().length === 0 ? (
            <UploadButton />
          ) : null
        ) : (
          <div>
            <Button
              loading={loading}
              onClick={() => uploadRef.current?.click()}
              icon={<UploadOutlined />}
              style={{ marginTop: 6 }}
            >
              Upload File
            </Button>
            <div style={{ paddingTop: 4 }}>{description}</div>
          </div>
        )}
      </Upload>
      <Modal
        open={preview.visible}
        title={'image'}
        footer={null}
        onCancel={() => setPreview({ visible: false, image: '' })}
      >
        <Image
          alt="example"
          style={{
            width: '100%',
          }}
          src={preview.image}
        />
      </Modal>
    </>
  )
}
