import React, { useState, useEffect } from 'react';
import { Badge, FilePicker, Icon, Toast, ImagePreview } from 'zarm';
import upload from './upload';
import { compressImage } from '~/utils/helper';
import './ImagePicker.less';

// onFileChanged: 上传成功/删除都会触发

export default function ImagePicker({
  onChange,
  multiple = false,
  text = '',
  formData = {},
  data = [],
  action = '',
}) {
  const [fileItems, setFileItems] = useState(data); // response object from server

  // preview
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const hide = () => setVisible(false);

  const show = (index) => {
    setIndex(index);
    setVisible(true);
  };

  const onPickerChange = (files) => {
    if (!multiple) {
      compressImage(files.file).then((pfile) => {
        upload({
          onError: () => {},
          onSuccess: (res) => {
            const { result } = res;
            const data = Array.isArray(result) ? result[0] : result ? result : null;
            setFileItems([data]);
            if (typeof onChange === 'function') {
              onChange(data);
            }
          },
          data: formData,
          file: pfile,
          withCredentials: true,
          action: action,
          method: 'post',
        });
      });
    } else {
      const dataArr = [];
      let len = 0;

      files.map((file, idx) => {
        compressImage(file.file).then((pfile) => {
          upload({
            onError: () => {
              len++;
            },
            onSuccess: (res) => {
              len++;

              const data = Array.isArray(res.result) ? res.result[0] : null;
              dataArr[idx] = data;

              if (len == files.length && typeof onChange === 'function') {
                const newFileItems = fileItems.concat(dataArr);
                setFileItems(newFileItems);
                onChange(newFileItems);
              }
            },
            // data: { pathIsMd5: true, storeType: 'I', type: '39' },
            data: formData,
            file: pfile,
            withCredentials: true,
            action: action,
            method: 'post',
          });
        });
      });
    }
  };

  const remove = (index) => {
    const newFiles = fileItems.slice();
    newFiles.splice(index, 1);
    if (typeof onChange === 'function') {
      onChange(newFiles);
    }
    setFileItems(newFiles);
  };

  return (
    <div className="file-picker-wrapper">
      {fileItems.map((item, idx) => (
        <Badge
          key={idx}
          shape="circle"
          text={
            <span className="file-picker-closebtn">
              <Icon type="wrong" />
            </span>
          }
          onClick={() => remove(idx)}
        >
          <div className="file-picker-item-img" onClick={() => show(idx)}>
            <img src={item.href} alt="" />
          </div>
        </Badge>
      ))}

      {fileItems.length ? (
        <ImagePreview
          visible={visible}
          images={fileItems.map((f) => f.href)}
          onClose={hide}
          activeIndex={index}
        />
      ) : null}

      {fileItems.length === 1 && !multiple ? null : (
        <FilePicker
          multiple={multiple}
          className={`file-picker-btn ${text ? 'has-text' : ''}`}
          name={text}
          accept="image/*"
          onChange={onPickerChange}
        >
          <div>
            <Icon type="add" size="md" />
            <div className="text">{text}</div>
          </div>
        </FilePicker>
      )}
    </div>
  );
}
