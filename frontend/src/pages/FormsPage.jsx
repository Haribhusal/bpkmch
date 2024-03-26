import React, { useState } from "react";
import { useGetFormsQuery } from "./../services/forms";
import {
  Button,
  Checkbox,
  Divider,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { formatDistanceToNow } from "date-fns";

const FormsPage = () => {
  const [loading, setLoading] = useState(false);

  const [showColumns, setShowColumns] = useState(false);
  const columns = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "1",
      fixed: "left",
      width: 200,
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "2",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "3",
    },
    {
      title: "Sub Group",
      dataIndex: "subGroup",
      key: "4",
    },
    {
      title: "Registration Number",
      dataIndex: "registrationNumber",
      key: "5",
    },
    {
      title: "Action",
      width: 150,
      fixed: "right",
      key: "6",

      render: () => (
        <Space>
          <Typography.Link>Action1</Typography.Link>
          <Typography.Link>Action2</Typography.Link>
        </Space>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "registeredDate",
      key: "15",
      render: (date) => {
        const dateConverted = new Date(date);
        const finalDate = formatDistanceToNow(dateConverted, {
          addSuffix: true,
        });
        console.log(finalDate);
        return (
          <Tooltip placement="topLeft" title={date}>
            {finalDate}
          </Tooltip>
        );
      },
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "7",
      render: (date) => {
        const dateConverted = new Date(date);
        const finalDate = formatDistanceToNow(dateConverted, {
          addSuffix: true,
        });
        console.log(finalDate);
        return finalDate;
      },
    },
    {
      title: "Application Fee",
      dataIndex: "formFee",
      key: "8",
      render: (amount) => <a>Rs. {amount}</a>,
    },
    {
      title: "Ad Number",
      dataIndex: "advertisementNumber",
      key: "9",
    },
    {
      title: "Exam Center",
      dataIndex: "examCenter",
      key: "10",
    },
    {
      title: "Form Type",
      dataIndex: "formType",
      key: "11",
    },
    {
      title: "Khulla or AaPra",
      dataIndex: "khullaOrAaPra",
      key: "12",
    },
    {
      title: "Roll Number",
      dataIndex: "rollNumber",
      key: "13",
    },
  ];
  const defaultCheckedList = columns.slice(0, 6).map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));
  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  const { data: forms, isLoading, isError } = useGetFormsQuery();

  console.log(forms);
  return (
    <section>
      <div className="container">
        <div className="heading mb-5 flex justify-between">
          <h3 className="text-2xl">Applications</h3>
          <Button
            type="dashed"
            className=""
            onClick={() => setShowColumns(!showColumns)}
          >
            Show More Columns
          </Button>
        </div>
        <div className="items">
          {showColumns && (
            <div className="box mb-5">
              <Checkbox.Group
                value={checkedList}
                options={options}
                onChange={(value) => {
                  setCheckedList(value);
                }}
              />
            </div>
          )}

          <Table
            loading={isLoading}
            pagination={{
              pageSize: 50,
            }}
            scroll={{
              y: 240,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record._id}
                </p>
              ),
              rowExpandable: (record) => record._id !== "Not Expandable",
            }}
            dataSource={forms?.forms}
            columns={newColumns}
          />
        </div>
      </div>
    </section>
  );
};

export default FormsPage;
