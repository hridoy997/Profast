import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";


const generateTrackingId = () => {
    const date = new Date();
    const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PLC-${datePart}-${rand}`;
}


const SendParcel = () => {
    const { register, watch, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({
        mode: "onTouched",
        defaultValues: {
            parcelType: "document",
            parcelTitle: "",
            parcelWeight: "",
            senderName: "",
            senderContact: "",
            senderRegion: "",
            senderCenter: "",
            senderAddress: "",
            senderInstruction: "",
            receiverName: "",
            receiverContact: "",
            receiverRegion: "",
            receiverCenter: "",
            receiverAddress: "",
            receiverInstruction: "",
        },
    });

    const {user} = UseAuth();

    // Your loader data is the big array of districts
    const DISTRICTS_DATA = useLoaderData() || []; // [{ region, district, ... }]

    // Unique regions for dropdown
    const regionOptions = useMemo(() => {
        if (!DISTRICTS_DATA.length) return [];
        return [...new Set(DISTRICTS_DATA.map((d) => d.region))].sort();
    }, [DISTRICTS_DATA]);
    // console.log(regionOptions);

    const parcelType = watch("parcelType");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");


    // Service centers based on selected region (center = district)
    const senderCenters = useMemo(() => {
        if (!senderRegion) return [];
        // return DISTRICTS_DATA.filter(
        //     (d) => d.region === senderRegion && d.status === "active"
        // ).map((d) => d.district);
        return [...new Set(
            DISTRICTS_DATA
                .filter(d => d.region === senderRegion && d.status === "active")
                .map(d => d.district)
        )].sort();
    }, [senderRegion, DISTRICTS_DATA]);
    // console.log(senderCenters);

    const receiverCenters = useMemo(() => {
        if (!receiverRegion) return [];
        // return DISTRICTS_DATA.filter(
        //     (d) => d.region === receiverRegion && d.status === "active"
        // ).map((d) => d.district);
        return [...new Set(
            DISTRICTS_DATA
                .filter(d => d.region === receiverRegion && d.status === "active")
                .map(d => d.district)
        )].sort();
    }, [receiverRegion, DISTRICTS_DATA]);
    // console.log(receiverCenters);

    // const onSubmit = (data) => {
    //     const weight = parseFloat(data.parcelWeight) || 0;
    //     const isSameDistrict = data.senderCenter === data.receiverCenter;

    //     let cost = 0;

    //     // Document
    //     if (data.parcelType === "document") {
    //         cost = isSameDistrict ? 60 : 80;
    //     }
    //     // Non-document
    //     else {
    //         if (weight <= 3) {
    //             cost = isSameDistrict ? 110 : 150;
    //         } else {
    //             const extraWeight = weight - 3;
    //             const extraCost = extraWeight * 40;

    //             cost = (isSameDistrict ? 110 : 150) + extraCost;

    //             // +৳40 extra if Outside District and weight > 3kg
    //             // Outside District extra fee
    //             if (!isSameDistrict) cost += 40;
    //         }
    //     }

    //     Swal.fire({
    //         title: "Confirm Parcel Submission",
    //         html: `<strong style="font-size:22px">Delivery Cost: ৳${cost}</strong>`,
    //         icon: "info",
    //         showCancelButton: true,
    //         confirmButtonText: "Confirm",
    //         cancelButtonText: "Cancel",
    //         confirmButtonColor: "#22c55e",
    //         cancelButtonColor: "#9ca3af",
    //         backdrop: true,
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             const parcelData = {
    //                 ...data,
    //                 cost,
    //                 creation_date: new Date().toISOString(),
    //             };

    //             console.log("Saving Parcel Data:", parcelData);
    //             Swal.fire("Success", "Parcel booked successfully!", "success");
    //             reset();
    //         }
    //     });
    // };

    const onSubmit = (data) => {
        const weight = parseFloat(data.parcelWeight) || 0;
        const isSameDistrict = data.senderCenter === data.receiverCenter;

        const zoneText = isSameDistrict ? "Within City (Same District)" : "Outside District";

        // Breakdown variables
        let base = 0;
        let extraKg = 0;
        let extraKgCost = 0;
        let outsideExtra = 0;

        // Calculate based on policy
        if (data.parcelType === "document") {
            base = isSameDistrict ? 60 : 80;
        } else {
            // Non-document
            if (weight <= 3) {
                base = isSameDistrict ? 110 : 150;
            } else {
                base = isSameDistrict ? 110 : 150;

                extraKg = weight - 3;
                extraKgCost = extraKg * 40;

                // +৳40 extra if Outside District and weight > 3kg
                if (!isSameDistrict) outsideExtra = 40;
            }
        }

        const cost = base + extraKgCost + outsideExtra;

        const typeLabel = data.parcelType === "document" ? "Document" : "Non-Document";
        const weightLabel =
            data.parcelType === "document"
                ? "Any"
                : `${weight.toFixed(1)} kg ${weight <= 3 ? "(Up to 3kg)" : "(> 3kg)"}`;

        const breakdownRows = `
            <div style="text-align:left; font-size:14px; line-height:1.6;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span><b>Parcel Type:</b></span>
                <span>${typeLabel}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span><b>Zone:</b></span>
                <span>${zoneText}</span>
            </div>

            <hr style="margin:10px 0; opacity:.2;" />

            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <span>Base price</span>
                <span>৳${base}</span>
            </div>

            ${data.parcelType !== "document" && weight > 3
                ? `
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                    <span>Extra weight (${extraKg.toFixed(1)} kg × ৳40)</span>
                    <span>৳${extraKgCost}</span>
                    </div>
                `
                : ""
            }

            ${outsideExtra > 0
                ? `
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                    <span>Outside district extra</span>
                    <span>৳${outsideExtra}</span>
                    </div>
                `
                : ""
            }

            <hr style="margin:12px 0; opacity:.2;" />

            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:700; font-size:16px;">Total</span>
                <span style="font-weight:800; font-size:20px; color:#16a34a;">৳${cost}</span>
            </div>

            <p style="margin-top:10px; font-size:12px; opacity:.75;">
                Weight: ${weightLabel}
            </p>
            </div>
        `;

        Swal.fire({
            title: "Review Pricing",
            html: breakdownRows,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Go back to editing",
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#9ca3af",
            backdrop: true,
            width: 520,
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    cost,
                    created_by: user?.email,
                    payment_status: "unpaid",
                    delivery_status: "not_collected",
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingId(),
                };

                console.log("Saving Parcel Data:", parcelData);

                // ✅ Here you can navigate to payment page
                // navigate("/payment", { state: parcelData });

                Swal.fire({
                    icon: "success",
                    title: "Proceeding to payment...",
                    timer: 1000,
                    showConfirmButton: false,
                });

                // If you DON'T want reset before payment, remove this line
                reset();
            }
            // else: user goes back to editing (do nothing)
        });
    };

    useEffect(() => {
        setValue("senderCenter", "");
    }, [senderRegion, setValue]);

    useEffect(() => {
        setValue("receiverCenter", "");
    }, [receiverRegion, setValue]);

    useEffect(() => {
        if (parcelType === "document") setValue("parcelWeight", "");
    }, [parcelType, setValue]);


    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <div className="bg-base-100 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
                <h1 className="text-3xl font-bold text-black">Add Parcel</h1>
                <div className="divider my-4" />
                <h2 className="text-base font-semibold text-black">
                    Enter your parcel details
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-8">
                    {/* Parcel Info */}
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div className="md:col-span-2">
                                <label className="label pb-1">
                                    <span className="label-text font-medium">Parcel Type *</span>
                                </label>

                                <div className="flex gap-8">

                                    <label className="label cursor-pointer gap-2">
                                        <input
                                            type="radio"
                                            className="radio radio-success"
                                            value="document"
                                            {...register("parcelType", { required: "Please select a parcel type" })}
                                            defaultChecked
                                        />
                                        <span className="label-text">Document</span>
                                    </label>

                                    <label className="label cursor-pointer gap-2">
                                        <input
                                            type="radio"
                                            className="radio radio-success"
                                            value="non-document"
                                            {...register("parcelType", { required: "Please select a parcel type" })}
                                        />
                                        <span className="label-text">Not-Document</span>
                                    </label>
                                </div>

                                {errors.parcelType && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.parcelType.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label pb-1">
                                    <span className="label-text font-medium">Parcel Name *</span>
                                </label>
                                <input
                                    className={`input input-bordered w-full ${errors.parcelTitle ? "input-error" : ""
                                        }`}
                                    placeholder="Parcel Name"
                                    {...register("parcelTitle", { required: "Parcel name is required" })}
                                />
                                {errors.parcelTitle && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.parcelTitle.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label pb-1">
                                    <span className="label-text font-medium">
                                        Parcel Weight (KG){" "}
                                        {/* <span className="text-base-content/60">
                                            {parcelType === "non-document"
                                                ? "('optional')"
                                                : "(disabled)"}
                                        </span> */}
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    disabled={parcelType === "document"}
                                    className="input input-bordered w-full disabled:opacity-60"
                                    placeholder="Parcel Weight (KG)"
                                    {...register("parcelWeight", {
                                        required:
                                            parcelType === "non-document" ? "Parcel weight is required for non-document parcels" : false,
                                        min: {
                                            value: 0.1,
                                            message: "Weight must be at least 0.1 kg",
                                        },
                                    })}
                                />
                                {errors.parcelWeight && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.parcelWeight.message}
                                    </p>
                                )}
                            </div>

                        </div>
                    </section>

                    <div className="divider" />

                    {/* Sender + Receiver */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Sender */}
                        <div>
                            <h3 className="font-semibold mb-3">Sender Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Row 1 */}
                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Sender Name *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.senderName ? "input-error" : ""
                                            }`}
                                        placeholder="Sender Name"
                                        {...register("senderName", { required: "Required Sender Name" })}
                                    />
                                    {errors.senderName && (
                                        <p className="text-error text-xs mt-1">{errors.senderName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Sender Contact No *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.senderContact ? "input-error" : ""
                                            }`}
                                        placeholder="Sender Contact No"
                                        {...register("senderContact", {
                                            required: "Required Sender Contact No",
                                            pattern: {
                                                value: /^[0-9]{11}$/,
                                                message: "Enter valid 11 digit number",
                                            },
                                        })}
                                    />
                                    {errors.senderContact && (
                                        <p className="text-error text-xs mt-1">{errors.senderContact.message}</p>
                                    )}

                                </div>

                                {/* Row 2 */}
                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Your Region *</span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.senderRegion ? "select-error" : ""
                                            }`}
                                        {...register("senderRegion", { required: "Required Your Region" })}
                                    >
                                        <option value="">Select your region</option>
                                        {regionOptions.map((r, index) => (
                                            <option key={index} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.senderRegion && (
                                        <p className="text-error text-xs mt-1">{errors.senderRegion.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">
                                            Sender Pickup Wire house *
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.senderCenter ? "select-error" : ""
                                            }`}
                                        disabled={!senderRegion}
                                        {...register("senderCenter", { required: "Required Sender Pickup Wire house" })}
                                    >
                                        <option value="">Select Wire house</option>
                                        {senderCenters.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.senderCenter && (
                                        <p className="text-error text-xs mt-1">{errors.senderCenter.message}</p>
                                    )}
                                </div>

                                {/* Row 3 full width */}
                                <div className="md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">Address *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.senderAddress ? "input-error" : ""
                                            }`}
                                        placeholder="Address"
                                        {...register("senderAddress", { required: "Required Sender Address" })}
                                    />
                                    {errors.senderAddress && (
                                        <p className="text-error text-xs mt-1">{errors.senderAddress.message}</p>
                                    )}
                                </div>

                                {/* Pickup Instruction */}
                                <div className="md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">Pickup Instruction *</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered w-full ${errors.senderInstruction ? "textarea-error" : ""
                                            }`}
                                        placeholder="Pickup Instruction"
                                        rows={3}
                                        {...register("senderInstruction", { required: "Required Pickup Instruction" })}
                                    />
                                    {errors.senderInstruction && (
                                        <p className="text-error text-xs mt-1">{errors.senderInstruction.message}</p>
                                    )}
                                </div>
                            </div>

                            <p className="text-xs text-base-content/60 mt-3">
                                * PickUp Time 4pm–7pm Approx.
                            </p>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h3 className="font-semibold mb-3">Receiver Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Row 1 */}
                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Receiver Name *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.receiverName ? "input-error" : ""
                                            }`}
                                        placeholder="Receiver Name"
                                        {...register("receiverName", { required: "Required Receiver Name" })}
                                    />
                                    {errors.receiverName && (
                                        <p className="text-error text-xs mt-1">{errors.receiverName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Receiver Contact No *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.receiverContact ? "input-error" : ""
                                            }`}
                                        placeholder="Receiver Contact No"
                                        {...register("receiverContact", {
                                            required: "Required Receiver Contact No",
                                            pattern: {
                                                value: /^[0-9]{11}$/,
                                                message: "Enter valid 11 digit number",
                                            },
                                        })}
                                    />
                                    {errors.receiverContact && (
                                        <p className="text-error text-xs mt-1">{errors.receiverContact.message}</p>
                                    )}
                                </div>

                                {/* Row 2 */}
                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">Receiver Region *</span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.receiverRegion ? "select-error" : ""
                                            }`}
                                        {...register("receiverRegion", { required: "Required Receiver Region" })}
                                    >
                                        <option value="">Select your region</option>
                                        {regionOptions.map((r, index) => (
                                            <option key={index} value={r}>
                                                {r}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.receiverRegion && (
                                        <p className="text-error text-xs mt-1">{errors.receiverRegion.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="label pb-1">
                                        <span className="label-text">
                                            Receiver Delivery Wire house *
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.receiverCenter ? "select-error" : ""
                                            }`}
                                        disabled={!receiverRegion}
                                        {...register("receiverCenter", { required: "Required Receiver Delivery Wire house" })}
                                    >
                                        <option value="">Select Wire house</option>
                                        {receiverCenters.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.receiverCenter && (
                                        <p className="text-error text-xs mt-1">{errors.receiverCenter.message}</p>
                                    )}
                                </div>

                                {/* Row 3 full width */}
                                <div className="md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">Address *</span>
                                    </label>
                                    <input
                                        className={`input input-bordered w-full ${errors.receiverAddress ? "input-error" : ""
                                            }`}
                                        placeholder="Address"
                                        {...register("receiverAddress", { required: "Required Receiver Address" })}
                                    />
                                    {errors.receiverAddress && (
                                        <p className="text-error text-xs mt-1">{errors.receiverAddress.message}</p>
                                    )}
                                </div>

                                {/* Delivery Instruction */}
                                <div className="md:col-span-2">
                                    <label className="label pb-1">
                                        <span className="label-text">Delivery Instruction *</span>
                                    </label>
                                    <textarea
                                        className={`textarea textarea-bordered w-full ${errors.receiverInstruction ? "textarea-error" : ""
                                            }`}
                                        placeholder="Delivery Instruction"
                                        rows={3}
                                        {...register("receiverInstruction", { required: "Required Receiver Delivery Instruction" })}
                                    />
                                    {errors.receiverInstruction && (
                                        <p className="text-error text-xs mt-1">{errors.receiverInstruction.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-primary/80 hover:bg-primary text-black border-none w-full sm:w-64"
                        >
                            {isSubmitting ? "Processing..." : "Proceed to Confirm Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;
