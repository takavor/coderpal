"use client";

import React from "react";
import moment from "moment";

interface DateProps {
  obj: {
    createdAt: Date;
  };
}

export default function Date({ obj }: DateProps) {
  return (
    <div>
      <p>{moment(obj.createdAt).format("LLL")}</p>
    </div>
  );
}
