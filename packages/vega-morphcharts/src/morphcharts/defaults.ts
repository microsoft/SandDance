/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { quat, vec3 } from 'gl-matrix';
import { Constants, Helpers } from 'morphcharts';

function createCameraDefaults() {
    const qModel2d = quat.create();
    const qModel3d = Constants.QUAT_ROTATEX_MINUS_90;
    const qCameraRotation2d = quat.create();
    const qCameraRotation3d = quat.create();
    const qAngle = quat.create();
    const vPosition = vec3.create();

    // Altitude (pitch around local right axis)
    quat.setAxisAngle(qCameraRotation3d, Constants.VECTOR3_UNITX, Helpers.AngleHelper.degreesToRadians(30));

    // Azimuth (yaw around global up axis)
    quat.setAxisAngle(qAngle, Constants.VECTOR3_UNITY, Helpers.AngleHelper.degreesToRadians(-25));
    quat.multiply(qCameraRotation3d, qCameraRotation3d, qAngle);

    return {
        qModel2d,
        qModel3d,
        qCameraRotation2d,
        qCameraRotation3d,
        vPosition,
    };
}

export const cameraDefaults = createCameraDefaults();
